# EduVerse 아키텍처 가이드라인

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [아키텍처 패턴](#아키텍처-패턴)
3. [패키지 구조](#패키지-구조)
4. [레이어별 구현 가이드](#레이어별-구현-가이드)
5. [데이터베이스 설계](#데이터베이스-설계)
6. [보안 아키텍처](#보안-아키텍처)
7. [성능 최적화](#성능-최적화)
8. [배포 및 운영](#배포-및-운영)

---

## 프로젝트 개요

### 기술 스택

#### 핵심 프레임워크
- **Spring Boot**: 3.4.10
- **Java**: 17 (LTS)
- **Spring Framework**: 6.x

#### 데이터베이스 및 ORM
- **JPA/Hibernate**: 영속성 관리 및 객체-관계 매핑
- **MyBatis**: 복잡한 쿼리 및 동적 SQL 처리
- **QueryDSL**: 타입 안전한 쿼리 작성
- **MariaDB**: 관계형 데이터베이스

#### 매핑 및 유틸리티
- **MapStruct**: DTO-Entity 변환 (컴파일 타임 매핑)
- **ModelMapper**: 객체 간 매핑 (런타임 매핑)
- **Lombok**: 보일러플레이트 코드 제거

#### 보안
- **Spring Security**: 인증/인가 프레임워크
- **JWT (jjwt)**: 토큰 기반 인증

#### API 문서화
- **SpringDoc OpenAPI**: Swagger UI 통합

#### 기타
- **Spring AOP**: 횡단 관심사 처리 (로깅, 재시도)
- **Spring Batch**: 배치 작업 처리
- **Spring WebFlux**: 비동기 HTTP 클라이언트 (Jenkins 연동)
- **Spring WebSocket**: 실시간 통신

### 프로젝트 구조 개요

```
src/main/java/com/eduverse/
├── core/                    # 공통 모듈
│   ├── annotation/          # 커스텀 어노테이션
│   ├── aspect/             # AOP 구현
│   ├── config/             # 공통 설정
│   ├── constants/          # 상수 정의
│   ├── controller/         # BaseController
│   ├── dto/                # 공통 DTO
│   ├── entity/             # BaseTimeEntity
│   ├── error/              # 에러 처리
│   ├── exception/          # 커스텀 예외
│   ├── handler/            # 예외 핸들러
│   ├── helper/             # 유틸리티 헬퍼
│   ├── jenkins/            # Jenkins 통합
│   └── mapper/             # BaseMapper
├── domain/                 # 도메인 모듈
│   ├── {domain}/           # 각 도메인별 패키지
│   │   ├── controller/     # REST 컨트롤러
│   │   ├── service/        # 비즈니스 로직
│   │   │   └── impl/       # 서비스 구현체
│   │   ├── repository/     # 데이터 접근 계층
│   │   ├── entity/         # 도메인 엔티티
│   │   ├── dto/            # 요청/응답 DTO
│   │   └── mapper/         # 도메인별 Mapper
├── global/                 # 전역 설정
│   ├── config/             # 전역 설정
│   ├── enums/              # 전역 Enum
│   ├── jwt/                # JWT 처리
│   ├── security/           # 보안 설정
│   └── util/               # 전역 유틸리티
└── EduVerseApplication.java # 메인 애플리케이션
```

---

## 아키텍처 패턴

### 1. 도메인 주도 설계 (DDD)

프로젝트는 **도메인 주도 설계(DDD)** 패턴을 따릅니다.

#### 핵심 원칙
- **도메인별 독립 패키지**: 각 도메인은 독립적인 패키지로 구성
- **도메인 모델 중심**: 비즈니스 로직이 엔티티에 포함
- **계층 분리**: Controller → Service → Repository 명확한 계층 분리

#### 도메인 구조 예시
```
domain/
├── task/           # Task 도메인
├── user/           # User 도메인
├── classes/        # Class 도메인
└── ...
```

### 2. 계층형 아키텍처 (Layered Architecture)

#### 계층 구조
```
┌─────────────────────────────────┐
│      Controller Layer            │  ← REST API 엔드포인트
├─────────────────────────────────┤
│      Service Layer               │  ← 비즈니스 로직
│      (Interface + Implementation)│
├─────────────────────────────────┤
│      Repository Layer            │  ← 데이터 접근
│      (JPA Repository + MyBatis)  │
├─────────────────────────────────┤
│      Entity Layer                │  ← 도메인 모델
└─────────────────────────────────┘
```

#### 각 계층의 책임

**Controller Layer**
- HTTP 요청/응답 처리
- 요청 데이터 유효성 검증
- 권한 체크 (@PreAuthorize)
- Swagger 문서화

**Service Layer**
- 비즈니스 로직 구현
- 트랜잭션 관리
- 도메인 간 협력 조율

**Repository Layer**
- 데이터 영속성 관리
- 쿼리 실행
- 데이터 접근 추상화

**Entity Layer**
- 도메인 모델 정의
- 비즈니스 규칙 캡슐화
- 도메인 이벤트 처리

### 3. 공통 모듈과 도메인 모듈 분리

#### Core 모듈 (공통 기능)
- `BaseController`: 공통 컨트롤러 기능
- `BaseTimeEntity`: 생성/수정 시간 자동 관리
- `BaseMapper`: 공통 매핑 인터페이스
- `GlobalExceptionHandler`: 전역 예외 처리
- `ErrorCode`: 에러 코드 관리

#### Domain 모듈 (도메인별 기능)
- 각 도메인은 독립적인 패키지로 구성
- 도메인 간 의존성 최소화
- 도메인별 특화된 로직 구현

---

## 패키지 구조

### 표준 패키지 구조

각 도메인은 다음 구조를 따릅니다:

```
com.eduverse.domain.{domain}/
├── controller/
│   └── {Domain}Controller.java
├── service/
│   ├── {Domain}Service.java          # 인터페이스
│   └── impl/
│       └── {Domain}ServiceImpl.java  # 구현체
├── repository/
│   └── {Domain}Repository.java
├── entity/
│   └── {Domain}.java
├── dto/
│   ├── {Domain}Request.java
│   └── {Domain}Response.java
└── mapper/
    └── {Domain}Mapper.java
```

### 패키지 네이밍 규칙

- **도메인명**: 소문자, 단수형 (예: `task`, `user`)
- **클래스명**: PascalCase (예: `TaskController`, `UserService`)
- **인터페이스**: `{Domain}Service`, `{Domain}Repository`
- **구현체**: `{Domain}ServiceImpl`
- **DTO**: `{Domain}Request`, `{Domain}Response`

---

## 레이어별 구현 가이드

### 1. Controller Layer

#### 기본 구조

```java
@Slf4j
@RestController
@RequestMapping("/{resources}")
@RequiredArgsConstructor
@Tag(name = "{Domain}", description = "{Domain} 관리 API")
public class {Domain}Controller extends BaseController {

    private final {Domain}Service {domain}Service;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PROFESSOR')")
    @Operation(summary = "{Domain} 생성", description = "새로운 {Domain}를 생성합니다.")
    public ResponseEntity<ApiResponse<{Domain}Response>> create{Domain}(
            @Valid @RequestBody {Domain}Request request) {
        
        {Domain}Response response = {domain}Service.create{Domain}(request);
        return created(response, "{Domain}가 성공적으로 생성되었습니다.");
    }
}
```

#### 규칙
1. **BaseController 상속**: 공통 응답 메서드 사용
2. **@RequiredArgsConstructor**: 생성자 주입
3. **@Tag**: Swagger 그룹핑
4. **@Operation**: API 문서화
5. **@PreAuthorize**: 메서드 레벨 권한 체크
6. **@Valid**: 요청 데이터 유효성 검증

#### 응답 형식

```java
// 성공 응답
return success(data, "성공 메시지");

// 생성 응답 (201)
return created(data, "생성 메시지");

// 페이징 응답
return successPage(page);
```

### 2. Service Layer

#### 인터페이스와 구현체 분리

**인터페이스**
```java
public interface {Domain}Service {
    {Domain}Response create{Domain}({Domain}Request request);
    {Domain}Response get{Domain}(Long id);
    List<{Domain}Response> getAll{Domain}s();
    {Domain}Response update{Domain}(Long id, {Domain}Request request);
    void delete{Domain}(Long id);
}
```

**구현체**
```java
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class {Domain}ServiceImpl implements {Domain}Service {

    private static final String NOT_FOUND_MESSAGE = "{Domain}를 찾을 수 없습니다. ";

    private final {Domain}Repository {domain}Repository;
    private final {Domain}Mapper {domain}Mapper;

    @Override
    @Transactional
    public {Domain}Response create{Domain}({Domain}Request request) {
        {Domain} entity = {Domain}.create(/* 파라미터 */);
        {Domain} saved = {domain}Repository.save(entity);
        return {domain}Mapper.toDto(saved);
    }

    @Override
    public {Domain}Response get{Domain}(Long id) {
        {Domain} entity = {domain}Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + id));
        return {domain}Mapper.toDto(entity);
    }
}
```

#### 규칙
1. **@Transactional(readOnly = true)**: 클래스 레벨 기본 설정
2. **@Transactional**: 쓰기 작업에만 명시적 사용
3. **상수 정의**: 에러 메시지 등은 상수로 관리
4. **예외 처리**: ResourceNotFoundException 사용
5. **Mapper 활용**: Entity ↔ DTO 변환

### 3. Repository Layer

#### JPA Repository

```java
@Repository
public interface {Domain}Repository extends JpaRepository<{Domain}, Long> {
    
    // 쿼리 메서드
    Optional<{Domain}> findBy{Field}(String {field});
    boolean existsBy{Field}(String {field});
    
    // 커스텀 쿼리
    @Query("SELECT d FROM {Domain} d WHERE d.{field} = :{field}")
    List<{Domain}> findBy{Field}(@Param("{field}") String {field});
}
```

#### 규칙
1. **@Repository**: 명시적 선언
2. **쿼리 메서드**: 간단한 쿼리는 메서드명으로 생성
3. **@Query**: 복잡한 쿼리는 JPQL 사용
4. **Optional 반환**: 단일 결과 조회 시
5. **List 반환**: 다중 결과 조회 시

#### MyBatis 사용

복잡한 동적 쿼리나 대용량 데이터 처리 시 MyBatis 사용:

```java
@Mapper
public interface {Domain}Mapper {
    List<{Domain}Response> findComplexQuery(Map<String, Object> params);
}
```

### 4. Entity Layer

#### 기본 구조

```java
@Entity
@Table(name = "TBL_{DOMAIN}")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class {Domain} extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "{DOMAIN}_ID")
    private Long {domain}Id;

    @Column(name = "{FIELD_NAME}", nullable = false)
    private String {fieldName};

    // 정적 팩토리 메서드
    public static {Domain} create(/* 파라미터 */) {
        return {Domain}.builder()
                .{field}({value})
                .build();
    }

    // 비즈니스 메서드
    public void update{Field}(String {field}) {
        this.{field} = {field};
    }
}
```

#### 규칙
1. **BaseTimeEntity 상속**: 생성/수정 시간 자동 관리
2. **@NoArgsConstructor(access = PROTECTED)**: 불변성 보장
3. **@Builder**: 객체 생성 편의성
4. **정적 팩토리 메서드**: 도메인 로직 캡슐화
5. **비즈니스 메서드**: 상태 변경은 메서드로 처리

### 5. DTO Layer

#### Request DTO

```java
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "{Domain} 생성/수정 요청")
public class {Domain}Request {

    @NotNull(message = "{Field}는 필수입니다")
    @Schema(description = "{Field} 설명", example = "예시값")
    private String {field};

    @Positive(message = "{Field}는 양수여야 합니다")
    private Long {idField};
}
```

#### Response DTO

```java
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "{Domain} 응답")
public class {Domain}Response {

    @Schema(description = "{Domain} ID", example = "1")
    private Long {domain}Id;

    @Schema(description = "{Field} 설명")
    private String {field};

    @Schema(description = "생성 날짜")
    private LocalDateTime createDt;

    @Schema(description = "수정 날짜")
    private LocalDateTime updateDt;
}
```

#### 규칙
1. **Request/Response 분리**: 명확한 책임 분리
2. **@Schema**: Swagger 문서화
3. **유효성 검증**: @NotNull, @Positive 등
4. **불변 객체**: @Getter만 사용, Setter 제거

### 6. Mapper Layer

#### MapStruct 사용

```java
@Mapper(config = GlobalMapperConfig.class)
public interface {Domain}Mapper {

    {Domain}Mapper INSTANCE = Mappers.getMapper({Domain}Mapper.class);

    {Domain}Response toDto({Domain} entity);

    List<{Domain}Response> toDto(List<{Domain} entities);

    Page<{Domain}Response> toDto(Page<{Domain} page);
}
```

#### 규칙
1. **GlobalMapperConfig 사용**: 공통 설정 적용
2. **컴파일 타임 생성**: 성능 최적화
3. **타입 안전성**: 컴파일 시점 오류 발견
4. **Page 매핑**: 페이징 결과 자동 변환

---

## 데이터베이스 설계

### JPA와 MyBatis 하이브리드 전략

#### JPA 사용 시나리오
- 기본 CRUD 작업
- 단순 조회 쿼리
- 엔티티 관계 매핑
- 트랜잭션 관리

#### MyBatis 사용 시나리오
- 복잡한 동적 쿼리
- 대용량 데이터 처리
- 복잡한 조인 쿼리
- 성능 최적화가 필요한 쿼리

### 트랜잭션 관리

```java
@Service
@Transactional(readOnly = true)  // 기본 읽기 전용
public class {Domain}ServiceImpl {

    @Transactional  // 쓰기 작업에만 명시
    public {Domain}Response create{Domain}({Domain}Request request) {
        // ...
    }
}
```

### 쿼리 최적화 가이드

1. **N+1 문제 방지**: `@EntityGraph` 또는 `JOIN FETCH` 사용
2. **배치 처리**: `@BatchSize` 설정
3. **지연 로딩**: `@OneToMany(fetch = FetchType.LAZY)`
4. **인덱스 활용**: 자주 조회되는 컬럼에 인덱스 생성

---

## 보안 아키텍처

### Spring Security 설정

#### JWT 기반 인증
- **Stateless**: 세션 사용 안 함
- **Bearer Token**: Authorization 헤더 사용
- **토큰 갱신**: Refresh Token 메커니즘

#### 권한 관리
```java
@PreAuthorize("hasAnyRole('ADMIN', 'PROFESSOR')")
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasAuthority('READ_USER')")
```

### 보안 필터 체인

1. **CORS 설정**: 허용된 도메인만 접근
2. **CSRF 비활성화**: JWT 사용으로 불필요
3. **인증 실패 처리**: JwtAuthenticationEntryPoint
4. **권한 부족 처리**: JwtAccessDeniedHandler

---

## 성능 최적화

### 쿼리 최적화
1. **인덱스 활용**: 자주 조회되는 컬럼
2. **페이징 처리**: Pageable 사용
3. **배치 사이즈**: Hibernate 배치 설정
4. **캐싱**: 자주 조회되는 데이터 캐싱

### 애플리케이션 최적화
1. **MapStruct**: 컴파일 타임 매핑
2. **Lazy Loading**: 필요한 데이터만 로드
3. **Connection Pool**: HikariCP 설정
4. **비동기 처리**: @Async 활용

---

## 배포 및 운영

### 로깅 설정

```properties
logging.level.com.eduverse=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n
logging.file.name=logs/eduverse.log
logging.file.max-size=10MB
logging.file.max-history=30
```

### 모니터링

- **Actuator**: 헬스체크, 메트릭
- **Prometheus**: 메트릭 수집
- **Swagger**: API 문서화

### 환경별 설정

- **application.properties**: 공통 설정
- **application-dev.properties**: 개발 환경
- **application-prod.properties**: 운영 환경

---

## 참고 자료

### 핵심 클래스
- `BaseController`: 공통 컨트롤러 기능
- `BaseTimeEntity`: 시간 자동 관리
- `GlobalExceptionHandler`: 전역 예외 처리
- `ErrorCode`: 에러 코드 관리
- `BaseMapper`: 공통 매핑 인터페이스

### 예시 도메인
- `Task`: 완전한 CRUD 구현 예시
- `User`: 복잡한 비즈니스 로직 예시

