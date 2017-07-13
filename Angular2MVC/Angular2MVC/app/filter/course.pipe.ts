import { PipeTransform, Pipe } from '@angular/core';
import { ICourse } from '../Models/course';

@Pipe({
    name: 'courseFilter'
})
export class CourseFilterPipe implements PipeTransform {

    transform(value: ICourse[], filter: string): ICourse[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICourse) =>

            app.Id != null && app.Id.toLocaleString().indexOf(filter) != -1
            || app.CourseName != null && app.CourseName.toLocaleLowerCase().indexOf(filter) != -1
            || app.CourseTeacher != null && app.CourseTeacher.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}