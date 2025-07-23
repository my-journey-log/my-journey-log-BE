FROM openjdk:24-jdk

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
FROM openjdk:24-jdk-slim-bullseye

RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

WORKDIR /backend

COPY gradle/wrapper/ gradle/wrapper/
COPY gradlew settings.gradle build.gradle ./

RUN chmod +x ./gradlew

CMD ["bash", "-c", "./gradlew bootRun --no-daemon"]