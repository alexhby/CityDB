create table newcollege as
select college.IPEDSID, college.NAME, college.CITY, college.STABBR, college.ADDRESS, college.ZIP, college.TELEPHONE, college.LATITUDE, college.LONGITUDE, college.TOT_ENROLL, college.DORM_CAP, college.GRAD_DEBT_MDN_SUPP, college2.TOT_EMPLOY, college.INSTURL, college.NPCURL
from college inner join college2
where college.IPEDSID = college2.IPEDSID;