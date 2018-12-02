function checker(elm, type) {  if (elm != undefined) {    if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim();    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}

function reg(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}

function regTest(x, s){return new RegExp(x, 'i').test(s);}

function splitDates(str){	if(/\s–\s/.test(str) === true){		let start = reg(/.+?(?=\s–)/.exec(str),0);		let end = reg(/(?<=\s–\s).+/.exec(str),0);		return new Array(start,end);	}else{		var d = reg(/\d{4}/.exec(str),0);		return new Array(d,d);	}}

function getMonthNum(str){	var month = 1;	if(regTest('Jan',str) === true){month = 1;}	if(regTest('Feb',str) === true){month = 2;}	if(regTest('Mar',str) === true){month = 3;}	if(regTest('Apr',str) === true){month = 4;}	if(regTest('May',str) === true){month = 5;}	if(regTest('Jun',str) === true){month = 6;}	if(regTest('Jul',str) === true){month = 7;}	if(regTest('Aug',str) === true){month = 8;}	if(regTest('Sep',str) === true){month = 9;}	if(regTest('Oct',str) === true){month = 10;}	if(regTest('Nov',str) === true){month = 11;}	if(regTest('Dec',str) === true){month = 12;}	if(regTest('Present',str) === true){month = new Date().getMonth()+1;}	return month;}

function getYearNum(str){	if(regTest('present',str) === true){		return new Date().getFullYear();	}else{		return parseInt(reg(/\d{4}/.exec(str),0));	}}

function getMilsecByMonthYear(m,y){	var dString = m+'/15/'+y;	return new Date(dString).getTime();}

var expContainer = document.getElementById('profile-experience');
var eduContainer = document.getElementById('profile-education');
var crtContainer = document.getElementById('profile-certifications'); 
var lngContainer = document.getElementById('profile-language');
var sklContainer = document.getElementById('profile-skills');
var careerInterestContainer = document.getElementById('profile-career-interests');
var sumContainer = document.getElementById('profile-summary');

var infoContainer = checker(document.getElementsByClassName('profile-info')[0], 'next');
if(infoContainer != ''){
	var fullname = checker(infoContainer.getElementsByTagName('h1')[0], 'text');
}else{
	var fullname = '';
}

var isPublic = checker(document.getElementsByClassName('public-profile')[0], 'next');
if(isPublic != ''){
	var publicProfilePath = reg(/(?<=\/in\/).+/.exec(checker(isPublic.getElementsByTagName('a')[0], 'href')), 0);
}else{
	var publicProfilePath = ''
}

var geo = checker(document.getElementsByClassName('location searchable')[0], 'text');
var zipcode = reg(/(?<=postalCode=)\d+/.exec(checker(document.getElementsByClassName('location searchable')[0].getElementsByTagName('a')[0], 'href')),0);

if(sumContainer != null){
	var summary = checker(sumContainer.getElementsByClassName('module-body')[0], 'text');
}else{
	var summary = '';
}
function getDataByLoop(elm, str){
	var arr = [];
	if(elm != null){
		let itm = elm.getElementsByClassName(str);
		for(i=0; i<itm.length; i++){
    		arr.push(itm[i].innerText.trim());
		}
	}
	return arr;
}

function getInterests(x){
	if(careerInterestContainer != null){
	var elm = careerInterestContainer.getElementsByClassName('row-data');
	for(i=0; i<elm.length; i++){
		let type = checker(elm[i].getElementsByTagName('h2')[0], 'text');
		if(new RegExp(x, 'i').test(type) === true){
			return JSON.parse('["'+checker(elm[i].getElementsByTagName('p')[0], 'text').replace(/, /g, '","')+'"]');
		}
    }
    }
}

function getExperience(elm){
var arr = [];
	if(elm != null){
	var itm = elm.getElementsByClassName('position');	
	for(i=0; i<itm.length; i++){
		let dateCont = reg(/.+?(?=\()|.+?\d+(?=\S+,)/.exec(checker(itm[i].getElementsByClassName('date-range')[0], 'text')), 0);

		let geo = checker(itm[i].getElementsByClassName('location')[0], 'text')

		let title = checker(itm[i].getElementsByTagName('h4')[0], 'text');
		let companyName = checker(itm[i].getElementsByTagName('h5')[0], 'text');
		let companyId = reg(/(?<=company\/)\d+/.exec(checker(checker(itm[i].getElementsByTagName('h5')[0], 'next').getElementsByTagName('a')[0], 'href')),0);
		let jobSummary = checker(itm[i].getElementsByClassName('description searchable')[0], 'text');
		
		let startDateMonth = getMonthNum(splitDates(dateCont)[0]); 
		let endDateMonth = getMonthNum(splitDates(dateCont)[1]); 
		let startDateYear = getYearNum(splitDates(dateCont)[0]);
		let endDateYear = getYearNum(splitDates(dateCont)[1]);
		let startTimeStamp = getMilsecByMonthYear(startDateMonth,startDateYear);
		let endTimeStamp = getMilsecByMonthYear(endDateMonth,endDateYear);

		arr.push({'title': title, 'jobSummary': jobSummary, 'startDateMonth': startDateMonth, 'endDateMonth': endDateMonth, 'startDateYear': startDateYear, 'endDateYear': endDateYear, 'startTimeStamp':startTimeStamp, 'endTimeStamp':endTimeStamp, 'geo': geo, 'companyName':companyName, 'companyId':companyId});
	}
    }
return arr;
}

function getEducation(elm){
	var arr = [];
	if(elm != null){
	var itm = elm.getElementsByClassName('position');	
	for(i=0; i<itm.length; i++){
		let institution = checker(itm[i].getElementsByTagName('h4')[0], 'text');
		let fieldOfStudy = checker(itm[i].getElementsByTagName('h5')[0], 'text');
		let institutionId = reg(/(?<=edu\/)\d+/.exec(checker(checker(itm[i].getElementsByTagName('h4')[0], 'next').getElementsByTagName('a')[0], 'href')),0);
		let eduSummary = checker(itm[i].getElementsByClassName('description searchable')[0], 'text');
		let dateCont = checker(itm[i].getElementsByClassName('date-range')[0], 'text');		
		let startDateMonth = getMonthNum(splitDates(dateCont)[0]); 
		let endDateMonth = getMonthNum(splitDates(dateCont)[1]); 
		let startDateYear = getYearNum(splitDates(dateCont)[0]);
		let endDateYear = getYearNum(splitDates(dateCont)[1]);
		let startTimeStamp = getMilsecByMonthYear(startDateMonth,startDateYear);
		let endTimeStamp = getMilsecByMonthYear(endDateMonth,endDateYear);
		
		arr.push({'institution':institution, 'institutionId': institutionId, 'fieldOfStudy':fieldOfStudy, 'eduSummary': eduSummary, 'startDateMonth': startDateMonth, 'endDateMonth': endDateMonth, 'startDateYear': startDateYear, 'endDateYear': endDateYear, 'startTimeStamp':startTimeStamp, 'endTimeStamp':endTimeStamp})
    }
    }
	return arr;
}

function getCertifications(elm){
	var arr = [];
	if(elm != null){
	var itm = elm.getElementsByClassName('position');	
	for(i=0; i<itm.length; i++){
 		let title = checker(itm[i].getElementsByTagName('h4')[0], 'text');
		let institution = checker(itm[i].getElementsByTagName('h5')[0], 'text');
		let dateCont = checker(itm[i].getElementsByClassName('date-range')[0], 'text');		
		let endDateYear = getYearNum(splitDates(dateCont)[1]);
		let endDateMonth = getMonthNum(reg(/[a-zA-Z]+/.exec(dateCont),0));
		arr.push({'title': title, 'institution': institution, 'endDateMonth': endDateMonth, 'endDateYear': endDateYear});
    }
    }
	return arr;
}

var profileObject = {
	'fullname': fullname,
	'geo':geo, 
	'zipcode': zipcode, 
	'publicProfilePath': publicProfilePath, 
	'summary': summary, 
	'experience': getExperience(expContainer), 
	'education': getEducation(eduContainer), 
	'languages': getDataByLoop(lngContainer,'language'), 
	'skills': getDataByLoop(sklContainer,'skill'), 
	'certifications': getCertifications(crtContainer), 
	'careerInterests': getInterests(careerInterestContainer, 'Roles'), 
	'relocation': getInterests(careerInterestContainer, 'Locations'), 
	'jobTypes': getInterests(careerInterestContainer, 'Job types')
};
