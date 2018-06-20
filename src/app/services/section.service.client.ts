export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  findSectionById(sectionId) {
    const url = 'http://localhost:4000/api/section/';
    return fetch(url + sectionId, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/unenrollment';
    return fetch(url, {
      method: 'put',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats, 'maxSeats': seats };
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSection(courseId, sectionId, name, seats, maxSeats) {
    const section = {'_id': sectionId, name, seats, maxSeats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId) + '/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteSection(courseId, sectionId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId) + '/' + sectionId, {
      method: 'delete',
      credentials: 'include',
    });
  }
}
