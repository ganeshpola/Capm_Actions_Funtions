namespace zemployeedata;


entity EmployeDetails {
   key ID : String;
    EmpName: String;
    Designation: String;
    Dob: Date;
    EmpSalary: Decimal(10,2) @mandatory;
    Emplocation: String;
    reportsTo: String;
    department : Association to Department;
}


entity Department {
    key ID : String;
    DepartmentName : String;
    DeptDescription: String;
    Empdetails : Composition of many EmployeDetails on Empdetails.department = $self

}