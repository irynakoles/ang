import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../Service/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICourse } from '../Models/course';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';


@Component({
    templateUrl: `app/Components/course.component.html`

})

export class CourseComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    courses: ICourse[];
    course: ICourse;
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "Search: ";

    constructor(private fb: FormBuilder, private _courseService: CourseService) { }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            Id: [''],
            CourseName: ['', Validators.required],
            CourseTeacher: [''],
        });
        this.userFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        this.LoadCourses();
    }

    onValueChanged(data?: any) {

        if (!this.userFrm) { return; }
        const form = this.userFrm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'FirstName': '',
        'LastName': '',
        'Gender': ''
    };

    validationMessages = {
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

    LoadCourses(): void {
        this.indLoading = true;
        this._courseService.get(Global.BASE_COURSE_ENDPOINT)
            .subscribe(courses => { this.courses = courses; this.indLoading = false; }
            //,error => this.msg = <any>error
            );
    }

    addCourse() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Course";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    }

    editCourse(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.course = this.courses.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.course);
        this.modal.open();
    }

    deleteCourse(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.course = this.courses.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.course);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._courseService.post(Global.BASE_COURSE_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadCourses();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._courseService.put(Global.BASE_COURSE_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadCourses();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._courseService.delete(Global.BASE_COURSE_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadCourses();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;

    }
}
