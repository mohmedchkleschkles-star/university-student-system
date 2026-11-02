// 1. هيكلة بيانات الموظف والرواتب (Class & Constructor)
class CompanyEmployee {
    constructor(empId, empName, hourlyRate, workedHours, department) {
        this.empId = empId;
        this.empName = empName;
        this.hourlyRate = hourlyRate;
        this.workedHours = workedHours;
        this.department = department;
    }

    calculateBaseSalary() {
        return this.hourlyRate * this.workedHours;
    }

    calculateBonus() {
        const base = this.calculateBaseSalary();
        if (this.workedHours > 160) {
            return base * 0.15; // مكافأة 15% لو ساعات العمل تجاوزت 160 ساعة
        }
        return 0;
    }

    calculateNetSalary() {
        const base = this.calculateBaseSalary();
        const bonus = this.calculateBonus();
        const taxes = base * 0.05; // خصم ضريبي 5%
        return (base + bonus) - taxes;
    }

    getEmployeeGrade() {
        const net = this.calculateNetSalary();
        if (net >= 8000) return 'خبير (Senior)';
        else if (net >= 5000) return 'متوسط (Mid-Level)';
        else return 'مبتدئ (Junior)';
    }
}

// 2. مصفوفة بيانات فريق العمل والشركات
const companyStaff = [];
companyStaff.push(new CompanyEmployee(501, 'أحمد محمود', 45, 175, 'التطوير البرمجي'));
companyStaff.push(new CompanyEmployee(502, 'سارة سعيد', 40, 150, 'التصميم الإبداعي'));
companyStaff.push(new CompanyEmployee(503, 'محمود صبري', 35, 165, 'خدمة العملاء'));
companyStaff.push(new CompanyEmployee(504, 'ياسمين رامي', 50, 180, 'إدارة المشاريع'));

console.log("=== تقرير الرواتب الشهري للموظفين ===");
companyStaff.forEach(staffMember => {
    const netPay = staffMember.calculateNetSalary();
    console.log(`الموظف: ${staffMember.empName} | القسم: ${staffMember.department} | الصافي: ${netPay.toFixed(2)} ج.م | التقييم: ${staffMember.getEmployeeGrade()}`);
});

// 3. تصفية الموظفين المؤهلين للحصول على حافز التميز الإضافي
const elitePerformers = companyStaff.filter(staffMember => {
    return staffMember.workedHours >= 165;
});

const eliteSummary = elitePerformers.map(staffMember => {
    return {
        fullName: staffMember.empName,
        departmentName: staffMember.department,
        totalHours: staffMember.workedHours,
        finalNet: staffMember.calculateNetSalary()
    };
});

console.log("\n=== قائمة الموظفين المميزين المستحقين للحافز ===");
console.log(eliteSummary);
