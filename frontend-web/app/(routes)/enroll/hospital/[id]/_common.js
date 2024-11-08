export const getToday = (hospital) => {
  const weekNumber = new Date().getDay();
  const weekList = hospital?.["clinicHoursList"];
  const resultList = {};
  const addedOrderWeekList = weekList?.map((week) => ({
    key: setOrder(week["weekName"]),
    ...week,
  }));
  addedOrderWeekList?.sort((a, b) => a.key - b.key);
  resultList["today"] = addedOrderWeekList?.filter((week) => {
    if (week?.["weekName"] === "매일") {
      return week;
    }
    return weekNumber === week.key;
  })?.[0];
  resultList["sortedList"] = addedOrderWeekList;
  return resultList;
};

const setOrder = (x) => {
  switch (x) {
    case "일":
      return 0;
    case "월":
      return 1;
    case "화":
      return 2;
    case "수":
      return 3;
    case "목":
      return 4;
    case "금":
      return 5;
    case "토":
      return 6;
    case "매일":
      return -1;
  }
};

export const getDoctors = (hospital) => {
  const doctors = hospital?.["doctors"]?.replace(/, /g, ",")?.split(",");
  const doctorTotal = doctors
    ?.map((e) => e.split(" ")?.[1]?.replace("명", "") * 1)
    ?.reduce((a, b) => a + b);
  return { doctors, doctorTotal: doctorTotal || 0 };
};

export const getSubjects = (hospital) => {
  const subjects = hospital?.["subject"]?.split("|||");
  return { subjects, subjectsTotal: subjects?.length || 0 };
};

export const getConvenience = (hospital) => {
  const conveniences = hospital?.["convenience"]?.split("|||");
  return { conveniences, convenienceTotal: conveniences?.length || 0 };
};
