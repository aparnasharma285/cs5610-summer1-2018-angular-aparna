export class CourseServiceClient {
  COURSE_URL = 'http://localhost:8080/api/course';
  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }
  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }
  createNewCourse(courseId, courseName) {
    const course = {'id': courseId, 'title': courseName};
    return fetch(this.COURSE_URL, {
      method: 'post',
      body: JSON.stringify(course),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  updateCourse(courseId, courseName) {
    const course = {'id': courseId, 'title': courseName};
    return fetch(this.COURSE_URL, {
      method: 'put',
      body: JSON.stringify(course),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteCourse(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId, {
      method: 'delete',
      credentials: 'include',
    });
  }
}
