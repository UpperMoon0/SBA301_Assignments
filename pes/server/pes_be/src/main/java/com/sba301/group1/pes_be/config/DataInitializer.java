package com.sba301.group1.pes_be.config;

import com.sba301.group1.pes_be.enums.Grade;
import com.sba301.group1.pes_be.enums.Role;
import com.sba301.group1.pes_be.models.Account;
import com.sba301.group1.pes_be.models.Classes;
import com.sba301.group1.pes_be.models.Lesson;
import com.sba301.group1.pes_be.repositories.AccountRepo;
import com.sba301.group1.pes_be.repositories.ClassesRepo;
import com.sba301.group1.pes_be.repositories.LessonRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements ApplicationRunner {

    private final AccountRepo accountRepo;
    private final ClassesRepo classesRepo;
    private final LessonRepo lessonRepo;
    private final AppConfig.SimplePasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        log.info("Initializing application data...");
        
        initializeAccounts();
        initializeLessons();
        initializeClasses();
        
        log.info("Data initialization completed.");
    }

    private void initializeAccounts() {
        if (accountRepo.count() == 0) {
            log.info("Creating default accounts...");
            
            // Create preschool director account
            Account director = Account.builder()
                    .email("director@sunflowerpreschool.com")
                    .password(passwordEncoder.encode("director123"))
                    .role(Role.ADMIN)
                    .status("ACTIVE")
                    .createdAt(LocalDate.now())
                    .name("Ms. Sarah Johnson")
                    .phone("555-123-4567")
                    .gender("Female")
                    .identityNumber("DIR001")
                    .build();
            accountRepo.save(director);

            // Create head teacher account
            Account headTeacher = Account.builder()
                    .email("ms.emily@sunflowerpreschool.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .role(Role.TEACHER)
                    .status("ACTIVE")
                    .createdAt(LocalDate.now())
                    .name("Ms. Emily Chen")
                    .phone("555-234-5678")
                    .gender("Female")
                    .identityNumber("TEACH001")
                    .build();
            accountRepo.save(headTeacher);

            // Create another teacher account
            Account teacher2 = Account.builder()
                    .email("mr.david@sunflowerpreschool.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .role(Role.TEACHER)
                    .status("ACTIVE")
                    .createdAt(LocalDate.now())
                    .name("Mr. David Rodriguez")
                    .phone("555-345-6789")
                    .gender("Male")
                    .identityNumber("TEACH002")
                    .build();
            accountRepo.save(teacher2);

            // Create parent/user account
            Account parent = Account.builder()
                    .email("parent@example.com")
                    .password(passwordEncoder.encode("parent123"))
                    .role(Role.USER)
                    .status("ACTIVE")
                    .createdAt(LocalDate.now())
                    .name("Jennifer Martinez")
                    .phone("555-456-7890")
                    .gender("Female")
                    .identityNumber("PAR001")
                    .build();
            accountRepo.save(parent);

            log.info("Default accounts created successfully.");
        } else {
            log.info("Accounts already exist, skipping initialization.");
        }
    }

    private void initializeLessons() {
        if (lessonRepo.count() == 0) {
            log.info("Creating default preschool lessons...");
            
            Lesson countingLesson = Lesson.builder()
                    .topic("Numbers & Counting")
                    .description("Learning numbers 1-10, basic counting, and simple patterns")
                    .build();
            lessonRepo.save(countingLesson);

            Lesson lettersLesson = Lesson.builder()
                    .topic("Letters & Phonics")
                    .description("Learning alphabet, letter sounds, and beginning reading skills")
                    .build();
            lessonRepo.save(lettersLesson);

            Lesson artCraftLesson = Lesson.builder()
                    .topic("Arts & Crafts")
                    .description("Creative expression through drawing, painting, and simple crafts")
                    .build();
            lessonRepo.save(artCraftLesson);

            Lesson musicLesson = Lesson.builder()
                    .topic("Music & Movement")
                    .description("Singing songs, dancing, and exploring rhythm with simple instruments")
                    .build();
            lessonRepo.save(musicLesson);

            Lesson storyTimeLesson = Lesson.builder()
                    .topic("Story Time")
                    .description("Reading picture books and developing listening and comprehension skills")
                    .build();
            lessonRepo.save(storyTimeLesson);

            Lesson playTimeLesson = Lesson.builder()
                    .topic("Free Play")
                    .description("Unstructured play time for social development and creativity")
                    .build();
            lessonRepo.save(playTimeLesson);

            Lesson outdoorPlayLesson = Lesson.builder()
                    .topic("Outdoor Play")
                    .description("Physical activities, nature exploration, and playground time")
                    .build();
            lessonRepo.save(outdoorPlayLesson);

            Lesson snackTimeLesson = Lesson.builder()
                    .topic("Snack Time")
                    .description("Healthy eating habits and social dining skills")
                    .build();
            lessonRepo.save(snackTimeLesson);

            log.info("Default preschool lessons created successfully.");
        } else {
            log.info("Lessons already exist, skipping initialization.");
        }
    }

    private void initializeClasses() {
        if (classesRepo.count() == 0) {
            log.info("Creating default preschool classes...");
            
            Account headTeacher = accountRepo.findByEmail("ms.emily@sunflowerpreschool.com").orElse(null);
            Account teacher2 = accountRepo.findByEmail("mr.david@sunflowerpreschool.com").orElse(null);
            
            Classes sunflowerSeedClass = Classes.builder()
                    .name("Sunflower Seeds (3-year-olds)")
                    .numberStudent("12")
                    .roomNumber("Rainbow Room")
                    .startDate("2024-09-01")
                    .endDate("2025-06-15")
                    .status("ACTIVE")
                    .grade(Grade.SEED)
                    .teacher(headTeacher)
                    .build();
            classesRepo.save(sunflowerSeedClass);

            Classes sunflowerBudClass = Classes.builder()
                    .name("Sunflower Buds (4-year-olds)")
                    .numberStudent("15")
                    .roomNumber("Sunshine Room")
                    .startDate("2024-09-01")
                    .endDate("2025-06-15")
                    .status("ACTIVE")
                    .grade(Grade.BUD)
                    .teacher(teacher2)
                    .build();
            classesRepo.save(sunflowerBudClass);

            Classes sunflowerBloomClass = Classes.builder()
                    .name("Sunflower Blooms (5-year-olds)")
                    .numberStudent("18")
                    .roomNumber("Garden Room")
                    .startDate("2024-09-01")
                    .endDate("2025-06-15")
                    .status("ACTIVE")
                    .grade(Grade.LEAF)
                    .teacher(headTeacher)
                    .build();
            classesRepo.save(sunflowerBloomClass);

            log.info("Default preschool classes created successfully.");
        } else {
            log.info("Classes already exist, skipping initialization.");
        }
    }
}