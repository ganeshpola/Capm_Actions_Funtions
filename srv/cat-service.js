const cds = require('@sap/cds')

module.exports = class MyService extends cds.ApplicationService { init() {

  const { EmployeDetails, Department } = cds.entities('MyService')

  this.before (['CREATE', 'UPDATE'], EmployeDetails, async (req) => {
    console.log('Before CREATE/UPDATE EmployeDetails', req.data)
  })
  this.after ('READ', EmployeDetails, async (employeDetails, req) => {
    console.log('After READ EmployeDetails', employeDetails)
  })
  this.before (['CREATE', 'UPDATE'], Department, async (req) => {

    const data = req.data;

    if (data.DepartmentName !== 'SAP') {
      // Perform validation or other logic
      throw new Error('DepartmentName must be SAP');
    }

    // console.log('Before CREATE/UPDATE Department', req.data)
  })
  this.after ('READ', Department, async (department, req) => {
    console.log('After READ Department', department)
  })

  // Implement the unbound action to get the total salary of employees

  this.on('getEmployeesalary', async (req) => {
    
    const result = await SELECT.from(EmployeDetails).columns('EmpSalary')
      .limit(3)

    // Sum the salaries
    const totalSalary = parseInt(result.reduce((sum, emp) => sum + emp.EmpSalary, 0))

    return totalSalary
  })


  this.before('getdept', async (req) => {
    const result = await SELECT.from(Department).columns('ID', 'DepartmentName','DeptDescription')

    if (result.DepartmentName == result.DeptDescription) {
      throw new Error('DepartmentName and DeptDescription must be not the same')
      return result 
    } 
  })


  return super.init()
}}
