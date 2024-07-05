function get_ssic_code(UEN) {
  var uen_url = `https://www.sgpbusiness.com/search?q=${UEN}`

  // search uen
  var response = UrlFetchApp.fetch(uen_url)
  var html = response.getContentText()
  var $ = Cheerio.load(html)

  // find company_url
  var company_url_element = $('.list-group.list-group-flush a').attr('href')

  var full_company_url = `https://www.sgpbusiness.com/${company_url_element}`

  // search company
  var company_response = UrlFetchApp.fetch(full_company_url)
  var company_html = company_response.getContentText()

  var $$ = Cheerio.load(company_html)
  var ssic_code_array = []

  // find ssic_code
  $$('li.list-group-item.col-lg-3 span.d-block').each(function(index, element){
    ssic_code_array.push($$(element).text().trim())
  })

  var ssic_code_string = ssic_code_array.join('; ')

  return ssic_code_string
}
