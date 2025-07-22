FROM openjdk:24-jdk-slim-bullseye

WORKDIR /backend

COPY gradle/wrapper/ gradle/wrapper/
COPY gradlew settings.gradle build.gradle ./

RUN chmod +x ./gradlew


CMD ["./gradlew", "bootRun", "--no-daemon"]
