export class TopicServiceClient {
  findTopicsForLessons(lessonId) {
    return fetch('http://localhost:8080/api/lesson/' + lessonId + '/topic/')
      .then(response => response.json());
  }
}
