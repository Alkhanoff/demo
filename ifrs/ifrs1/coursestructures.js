if (objCourse == null)
	objCourse = new Array();

objCurrentState = new currentStateObj();
strCourseID = "ifrs1";
objCourse[strCourseID] = new blockObj(strCourseID,null,"IFRS 1 Home");
objCourse[strCourseID].objChilds = new Array(new unitObj("s01",objCourse[strCourseID],"Overview"),
								new unitObj("s05",objCourse[strCourseID],"Scenario 1:General principles"),
								new unitObj("s10",objCourse[strCourseID],"Scenario 2:Voluntary exemptions"),
								new unitObj("s15",objCourse[strCourseID],"Scenario 3:Mandatory exceptions"),
								new unitObj("s20",objCourse[strCourseID],"Scenario 4:Presentation and disclosure"),
								new unitObj("s25",objCourse[strCourseID],"Assessment"));

objCourse[strCourseID].objCoachMeTitles["cm01"] = "Glossary of terms";
objCourse[strCourseID].objCoachMeTitles["cm05"] = "Main features of IFRS 1";
objCourse[strCourseID].objCoachMeTitles["cm10"] = "Voluntary exemptions";
objCourse[strCourseID].objCoachMeTitles["cm15"] = "Business combinations exemption";
objCourse[strCourseID].objCoachMeTitles["cm20"] = "Fixed assets";
objCourse[strCourseID].objCoachMeTitles["cm25"] = "Employee benefits";
objCourse[strCourseID].objCoachMeTitles["cm30"] = "Cumulative translation differences";
objCourse[strCourseID].objCoachMeTitles["cm35"] = "Compound financial instruments";
objCourse[strCourseID].objCoachMeTitles["cm40"] = "Subsidiaries, associates and joint ventures";
objCourse[strCourseID].objCoachMeTitles["cm45"] = "Derecognition";
objCourse[strCourseID].objCoachMeTitles["cm50"] = "Hedge accounting";
objCourse[strCourseID].objCoachMeTitles["cm55"] = "Estimates";
objCourse[strCourseID].objCoachMeTitles["cm60"] = "Held for sale and discontinued operations";
objCourse[strCourseID].objCoachMeTitles["cm65"] = "Presentation and disclosure";
objCourse[strCourseID].objCaseStudyTitles["cs05"] = "Consolidation of subsidiaries";
objCourse[strCourseID].objCaseStudyTitles["cs10"] = "Assets and liabilities";
objCourse[strCourseID].objCaseStudyTitles["cs15"] = "Assets acquired";
objCourse[strCourseID].objCaseStudyTitles["cs20"] = "Reclassification";
objCourse[strCourseID].objChilds[0].objCoachMes = new Array(strCourseID,"cm01");
objCourse[strCourseID].objChilds[0].objTaskQSArray = new Array();
objCourse[strCourseID].objChilds[0].objTaskQSArray["t05"] = new Array(0,["ifrs1_cm01",0,0]);

objCourse[strCourseID].objChilds[1].strBackgroundID = "ifrs1_b05";
objCourse[strCourseID].objChilds[1].objCoachMes = new Array(strCourseID,"cm05");
objCourse[strCourseID].objChilds[1].objTaskQSArray = new Array();
objCourse[strCourseID].objChilds[1].objTaskQSArray["t05"] = new Array(0,["ifrs1_cm05",2,0]);
objCourse[strCourseID].objChilds[1].objTaskQSArray["t10"] = new Array(0,["ifrs1_cm05",3,0]);

objCourse[strCourseID].objChilds[2].strBackgroundID = "ifrs1_b10";
objCourse[strCourseID].objChilds[2].objCaseStudies = new Array(strCourseID,"cs05","cs10","cs15","cs20");
objCourse[strCourseID].objChilds[2].objCoachMes = new Array(strCourseID,"cm10","cm15","cm20","cm25","cm30","cm35","cm40");
objCourse[strCourseID].objChilds[2].objTaskQSArray = new Array();
objCourse[strCourseID].objChilds[2].objTaskQSArray["t05"] = new Array(0,["ifrs1_cm10",0,0]);
objCourse[strCourseID].objChilds[2].objTaskQSArray["t15"] = new Array(0,["ifrs1_cm20",0,0]);
objCourse[strCourseID].objChilds[2].objTaskQSArray["t20"] = new Array(0,["ifrs1_cm25",0,0]);
objCourse[strCourseID].objChilds[2].objTaskQSArray["t25"] = new Array(0,["ifrs1_cm30",0,0]);
objCourse[strCourseID].objChilds[2].objTaskQSArray["t30"] = new Array(0,["ifrs1_cm35",0,0]);
objCourse[strCourseID].objChilds[2].objTaskQSArray["t35"] = new Array(0,["ifrs1_cm40",0,0]);

objCourse[strCourseID].objChilds[3].strBackgroundID = "ifrs1_b15";
objCourse[strCourseID].objChilds[3].objCoachMes = new Array(strCourseID,"cm45","cm50","cm55","cm60");
objCourse[strCourseID].objChilds[3].objTaskQSArray = new Array();
objCourse[strCourseID].objChilds[3].objTaskQSArray["t05"] = new Array(0,["ifrs1_cm45",0,0],["ifrs1_cm50",0,0],["ifrs1_cm55",0,0]);
objCourse[strCourseID].objChilds[3].objTaskQSArray["t10"] = new Array(0,["ifrs1_cm55",0,0]);

objCourse[strCourseID].objChilds[4].strBackgroundID = "ifrs1_b15";
objCourse[strCourseID].objChilds[4].objCoachMes = new Array(strCourseID,"cm65");
objCourse[strCourseID].objChilds[4].objTaskQSArray = new Array();
objCourse[strCourseID].objChilds[4].objTaskQSArray["t05"] = new Array(0,["ifrs1_cm65",0,0]);
objCourse[strCourseID].objChilds[4].objTaskQSArray["t10"] = new Array(0,["ifrs1_cm65",0,0]);

objCourse[strCourseID].objChilds[5].booAssessment = true;
objCourse[strCourseID].objChilds[5].intPassRate = 70;

