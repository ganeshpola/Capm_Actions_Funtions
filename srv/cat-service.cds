using zemployeedata as Empdata from '../db/schema';

service MyService {

    entity EmployeDetails as projection on Empdata.EmployeDetails;
    entity Department as projection on Empdata.Department
    actions {
        action getdept () returns Department;
    };

    // un biund actions because we are not connecting to any spectfic entity.
    function getEmployeesalary () returns  array of EmployeDetails;

}