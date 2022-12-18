import scanner from 'sonarqube-scanner';

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_b9a084775f58ba69be575e0b003416b93d0eb9f9',
    options: {
      'sonar.projectName': 'tes',
      'sonar.projectDescription': 'Here I can add a description of my project',
      'sonar.projectKey': 'test',
      'sonar.projectVersion': '0.0.1',
      'sonar.exclusions': '',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  () => process.exit()
);
