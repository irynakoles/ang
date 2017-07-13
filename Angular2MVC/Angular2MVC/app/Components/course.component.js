"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var course_service_1 = require("../Service/course.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var CourseComponent = (function () {
    function CourseComponent(fb, _courseService) {
        this.fb = fb;
        this._courseService = _courseService;
        this.indLoading = false;
        this.searchTitle = "Search: ";
        this.formErrors = {
            'FirstName': '',
            'LastName': '',
            'Gender': ''
        };
        this.validationMessages = {
            'FirstName': {
                'maxlength': 'First Name cannot be more than 20 characters long.',
                'required': 'First Name is required.'
            },
            'LastName': {
                'maxlength': 'Last Name cannot be more than 100 characters long.',
                'required': 'Last Name is required.'
            },
            'Gender': {
                'maxlength': 'Gender cannot be more than 2000 characters long.'
            }
        };
    }
    CourseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userFrm = this.fb.group({
            Id: [''],
            CourseName: ['', forms_1.Validators.required],
            CourseTeacher: [''],
        });
        this.userFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.LoadCourses();
    };
    CourseComponent.prototype.onValueChanged = function (data) {
        if (!this.userFrm) {
            return;
        }
        var form = this.userFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    CourseComponent.prototype.LoadCourses = function () {
        var _this = this;
        this.indLoading = true;
        this._courseService.get(global_1.Global.BASE_COURSE_ENDPOINT)
            .subscribe(function (courses) { _this.courses = courses; _this.indLoading = false; }
        //,error => this.msg = <any>error
        );
    };
    CourseComponent.prototype.addCourse = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Course";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    };
    CourseComponent.prototype.editCourse = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.course = this.courses.filter(function (x) { return x.Id == id; })[0];
        this.userFrm.setValue(this.course);
        this.modal.open();
    };
    CourseComponent.prototype.deleteCourse = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.course = this.courses.filter(function (x) { return x.Id == id; })[0];
        this.userFrm.setValue(this.course);
        this.modal.open();
    };
    CourseComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._courseService.post(global_1.Global.BASE_COURSE_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadCourses();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._courseService.put(global_1.Global.BASE_COURSE_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadCourses();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._courseService.delete(global_1.Global.BASE_COURSE_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadCourses();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    CourseComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    };
    CourseComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return CourseComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], CourseComponent.prototype, "modal", void 0);
CourseComponent = __decorate([
    core_1.Component({
        templateUrl: "app/Components/course.component.html"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, course_service_1.CourseService])
], CourseComponent);
exports.CourseComponent = CourseComponent;
//# sourceMappingURL=course.component.js.map