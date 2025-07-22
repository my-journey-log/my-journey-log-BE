FROM openjdk:24-jdk-slim-bullseye

## 빌드 결과물 복사
#ARG JAR_FILE=build/libs/*.jar
#COPY ${JAR_FILE} app.jar

# 애플리케이션 포트 노출
EXPOSE 8080
## 실행 명령어 정의
#ENTRYPOINT ["java", "-jar", "app.jar"]

WORKDIR /backend

COPY gradle/wrapper/ gradle/wrapper/
COPY gradlew settings.gradle build.gradle ./

RUN chmod +x ./gradlew

CMD ["./gradlew", "bootRun", "--no-daemon"]
