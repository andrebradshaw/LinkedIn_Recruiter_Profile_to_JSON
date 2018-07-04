# LinkedIn_Recruiter_Profile_to_JSON
This script pushes LinkedIn Recruiter Profile information into JSON format.

Sample Output:
{
	"profileLink": "http://www.linkedin.com/in/abradshaw",
	"firstName": "André",
	"lastName": "Bradshaw",
	"location": "Atlanta, Georgia",
	"zipcode": "30346",
	"experience": [
		["Javascript Developer", "10209778", "Owners.com", "1501560000000", "1530718565349"],
		["Senior Executive Recruiter", "163234", "Cox Enterprises", "1427860800000", "1501560000000"],
		["Director of Recruiting", "388480", "ASK Staffing Inc", "1309492800000", "1425186000000"],
		["Account Manager", "1061851", "Apollo Technical", "1262322000000", "1309492800000"],
		["Branch Manager", "43251", "TechniPower", "1220241600000", "1257048000000"],
		["Account Executive", "43251", "TechniPower", "1172725200000", "1217563200000"]
	],
	"education": [
		["edX", "194043", "Front-End Web Development", "2017", "2017"],
		["Dalton State College", "", "Business Administration", "2004", "2006"]
	],
	"skills": ["Engineering", "Training", "Talent Acquisition", "Thought Leadership", "Staff Augmentation", "Interviewing", "CRM", "Leadership", "Team Management", "Screening", "Executive Search", "Account Management", "JavaScript", "Sales", "CSS", "Sourcing", "Benefits Negotiation", "Negotiation", "Business Development", "Screening Resumes", "Web Scraping", "Technical Recruiting", "Customer Relationship Management (CRM)", "Python", "SDLC", "Web Development", "Contract Recruitment", "Management", "Process Improvement", "Staffing Services", "New Business Development", "Lead Generation", "Teamwork", "Permanent Placement", "HTML5", "Programmers", "IT Recruitment", "Networking", "Node.js", "Internet Recruiting", "Temporary Placement", "Information Technology", "Human Resources", "Salesforce.com", "Engineers", "Interviews", "Applicant Tracking Systems", "Developers", "Recruiting", "Social Networking"]
}

NOTES: 

Time format is in milliseconds since 1 Jan 1970.
"Present" is converted to the current time in which the script is executed. 
