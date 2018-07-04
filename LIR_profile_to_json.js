function grouped(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return '';
	}
}
function rmvBadChar(elm){
	return elm.replace(/\&|=|\/|\\|,|\#|"/g, '');
}

function validate(e, t){
	if(e.length >0){
    if(t == 'href'){
		    return e[0].href;
      }
    if(t == 'innerText'){
        return e[0].innerText;
      }
	}else{
		return '';
	}
}

function returnSkillsAsSudoArray(){
	var skillArr = [];

	var skillCont = document.getElementById("profile-skills");
	if(skillCont != null){

	var skillItem = skillCont.getElementsByTagName("li");
		for(i=0; i<skillItem.length; i++){
			var itm = skillItem[i].innerText;
			skillArr.push(itm);
		}
	return '["'+skillArr.toString().replace(/\&|\=/g, '').replace(/,/g, '","')+'"]';
	}else{
	return '[]';

	}
}
var local = document.getElementsByClassName("location searchable")[0].innerText;
var zipcode = grouped(/postalCode=(\d+)/.exec(validate(document.getElementsByClassName("location searchable")[0].getElementsByTagName("a"), "href")), 1);
var fullname = document.getElementsByClassName("info-container")[0].getElementsByTagName("h1")[0].innerText;
var cleanName = fullname.replace(/,.+/, '').replace(/\s+[A-Z]{2,5}.+/, '').replace(/\(|\)|"|\s*\b[jJ][rR]\b.*|\s*\b[sS][rR]\b.*|\s+$/g, '').replace(/\.$/, '');
var firstName = /^\w+\.\s+\w+(?=\s)|^\S+(?=\s)/.exec(cleanName);
var lastName = /\w*'\w*$|\w*-\w*$|\w+$/.exec(cleanName);

var profileLink = document.getElementsByClassName("public-profile searchable")[0].getElementsByTagName("a")[0].href;
var profilePath = grouped(/https:\/\/www.linkedin.com\/in\/(.+$)/.exec(profileLink), 1);

var positionsContainer = document.getElementById("profile-experience");
var positions = positionsContainer.getElementsByClassName("position");
var positionsArray = [];

for(i=0; i<positions.length; i++){
	var title = rmvBadChar(validate(positions[i].getElementsByTagName("h4"), "innerText"));
	var company = rmvBadChar(validate(positions[i].getElementsByTagName("h5"), "innerText"));
	var companyId = grouped(/company\/(\d+)/.exec(validate(positions[i].getElementsByTagName("h5")[0].getElementsByTagName("a"), "href")), 1);
	var daterange = validate(positions[i].getElementsByTagName("p"), "innerText").replace(/\s*\(.+/, '');
	var startDate = new Date(grouped(/^(.+?)\s*–/.exec(daterange), 1)).getTime();
	var endRange = /–.+/.exec(daterange);
	if (/Present/.test(endRange) === true) {
  		var endDate = new Date().getTime();
	}else{
  		var endDate = new Date(/[a-zA-Z]+\s*\d+|\d+/.exec(endRange)).getTime();
	}
	positionsArray.push('["'+title+'","'+companyId+'","'+company+'","'+startDate+'","'+endDate+'"]');

}

var eduContainer = document.getElementById("profile-education");
  var eduArray = [];
if(eduContainer != null){
  var edus = eduContainer.getElementsByClassName("position");
  for(ed=0; ed<edus.length; ed++){
	var institute = rmvBadChar(validate(edus[ed].getElementsByTagName("h4"), "innerText"));
	var instituteId = grouped(/edu\/(\d+)/.exec(validate(edus[ed].getElementsByTagName("h4")[0].getElementsByTagName("a"), "href")), 1);
	var degree = rmvBadChar(validate(edus[ed].getElementsByTagName("h5"), "innerText"));
	var eduDate = edus[ed].getElementsByTagName("p")[0].innerText;

	if (/\d+/.test(eduDate) === true) {
  		var eduStartYear = grouped(/^.*?(\d+)/.exec(eduDate), 1);
  		var eduEndYear = grouped(/(\d+)$/.exec(eduDate), 1);
	}else{
  		var eduStartYear = '';
  		var eduEndYear = ''
	}
	eduArray.push('["'+institute+'","'+instituteId+'","'+degree+'","'+eduStartYear+'","'+eduEndYear+'"]')
}
}
var eduSudoArr = '['+eduArray.toString()+']';
var posSudoArr = '['+positionsArray.toString()+']';

var jsonOut = '{"profileLink": "http://www.linkedin.com/in/'+profilePath+'","firstName":"'+firstName+'","lastName":"'+lastName+'","location":"'+local+'","zipcode":"'+zipcode+'","experience":'+posSudoArr+',"education":'+eduSudoArr+',"skills":'+returnSkillsAsSudoArray()+'}';
