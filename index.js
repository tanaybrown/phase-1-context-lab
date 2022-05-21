/* Your Code Here */

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let empObj = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
    return empObj;
  }
  
  function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(timeStamp) {
    let dateArr = timeStamp.split(" ");
    let timeInObj = {
      type: "TimeIn",
      hour: parseInt(dateArr[1].slice(0, 2) + "00"),
      date: dateArr[0],
    };
    this.timeInEvents.push(timeInObj);
    return this;
  }
  
  function createTimeOutEvent(timeStamp) {
    let dateArr = timeStamp.split(" ");
    let timeOutObj = {
      type: "TimeOut",
      hour: parseInt(dateArr[1].slice(0, 2) + "00"),
      date: dateArr[0],
    };
    this.timeOutEvents.push(timeOutObj);
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    let hourOut, hourIn;
  
    const timeIn = this.timeInEvents.find((day) => date === day.date);
    const timeOut = this.timeOutEvents.find((day) => date === day.date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
  
  function calculatePayroll(array) {
    let payroll = array.reduce((acc, cur) => {
      return acc + allWagesFor.call(cur);
    }, 0);
    return payroll;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    let emp = srcArray.find((rec) => rec.firstName === firstName);
    return emp;
  }
  
  /*
   We're giving you this function. Take a look at it, you might see some usage
   that's new and different. That's because we're avoiding a well-known, but
   sneaky bug that we'll cover in the next few lessons!
   As a result, the lessons for this function will pass *and* it will be available
   for you to use if you need it!
   */
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(
      function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
      }.bind(this),
      0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable;
  };
