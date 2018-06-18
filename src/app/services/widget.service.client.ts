export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('http://localhost:8080/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
