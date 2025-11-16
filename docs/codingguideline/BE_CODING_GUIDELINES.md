# EduVerse 코딩 가이드라인

## 목차
1. [코딩 규칙 및 컨벤션](#코딩-규칙-및-컨벤션)
2. [예외 처리](#예외-처리)
3. [공통 기능](#공통-기능)
4. [테스트 전략](#테스트-전략)
5. [코드 리뷰 체크리스트](#코드-리뷰-체크리스트)

---

## 코딩 규칙 및 컨벤션

### 네이밍 컨벤션

#### 클래스명
- **PascalCase** 사용
- 명사 사용, 명확하고 구체적인 이름
- 인터페이스: `{Domain}Service`, `{Domain}Repository`
- 구현체: `{Domain}ServiceImpl`
- DTO: `{Domain}Request`, `{Domain}Response`
- Entity: `{Domain}` (단수형)

```java
// 좋은 예
public class TaskController { }
public interface TaskService { }
public class TaskServiceImpl implements TaskService { }
public class TaskRequest { }
public class TaskResponse { }
public class Task extends BaseTimeEntity { }

// 나쁜 예
public class taskController { }  // 소문자 시작
public class TaskSvc { }         // 축약어 사용
public class TaskDTO { }         // Request/Response 구분 없음
```

#### 메서드명
- **camelCase** 사용
- 동사로 시작
- 명확하고 간결한 이름

```java
// 좋은 예
public TaskResponse createTask(TaskRequest request) { }
public List<TaskResponse> getTasksByCycleId(Long cycleId) { }
public void deleteTask(Long taskId) { }

// 나쁜 예
public TaskResponse task(TaskRequest request) { }  // 동사 없음
public List<TaskResponse> get(Long id) { }         // 너무 모호함
public void remove(Long id) { }                   // delete가 더 명확
```

#### 변수명
- **camelCase** 사용
- 의미 있는 이름 사용
- 축약어 지양

```java
// 좋은 예
private final TaskRepository taskRepository;
private Long taskId;
private String taskTitle;

// 나쁜 예
private final TaskRepository tr;      // 축약어
private Long id;                      // 너무 일반적
private String t;                     // 의미 없음
```

#### 상수
- **UPPER_SNAKE_CASE** 사용
- `static final` 선언
- 의미 있는 이름

```java
// 좋은 예
private static final String NOT_FOUND_TASK = "Task를 찾을 수 없습니다. ";
private static final int MAX_RETRY_COUNT = 3;
public static final String API_BASE_PATH = "/api/v1";

// 나쁜 예
private static final String msg = "Task를 찾을 수 없습니다. ";  // 소문자
private static final int max = 3;                               // 의미 없음
```

### 코드 스타일

#### 들여쓰기 및 공백
- **4칸 들여쓰기** 사용 (탭 사용 금지)
- 중괄호는 K&R 스타일
- 연산자 주변 공백

```java
// 좋은 예
public TaskResponse createTask(TaskRequest request) {
    Task task = Task.create(
            request.getCycleId(),
            request.getCurId(),
            request.getWeekNo(),
            request.getTaskTitle()
    );
    return taskMapper.toDto(task);
}

// 나쁜 예
public TaskResponse createTask(TaskRequest request){
Task task=Task.create(request.getCycleId(),request.getCurId(),request.getWeekNo(),request.getTaskTitle());
return taskMapper.toDto(task);
}
```

#### 임포트
- 와일드카드 임포트 금지
- 정적 임포트는 필요한 경우만 사용
- 임포트 순서: Java → Spring → Third-party → 프로젝트 내부

```java
// 좋은 예
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import com.eduverse.core.exception.ResourceNotFoundException;

// 나쁜 예
import java.util.*;  // 와일드카드 사용
```

#### 주석 및 문서화

##### JavaDoc 주석
- 공개 API는 JavaDoc 작성
- 클래스, 인터페이스, public 메서드에 작성

```java
/**
 * Task 서비스 인터페이스
 * Task 도메인의 비즈니스 로직을 정의합니다.
 */
public interface TaskService {

    /**
     * Task 생성
     * 
     * @param request Task 생성 요청 DTO
     * @return 생성된 Task 응답 DTO
     * @throws BusinessException 비즈니스 규칙 위반 시
     */
    TaskResponse createTask(TaskRequest request);
}
```

##### 인라인 주석
- 복잡한 로직에만 사용
- "왜"를 설명하는 주석 작성
- "무엇"을 설명하는 주석은 피함

```java
// 좋은 예
// N+1 문제 방지: JOIN FETCH 사용
@Query("SELECT t FROM Task t JOIN FETCH t.assignments WHERE t.cycleId = :cycleId")
List<Task> findByCycleIdWithAssignments(@Param("cycleId") Long cycleId);

// 나쁜 예
// Task를 조회한다
Task task = taskRepository.findById(taskId);
```

### Lombok 사용 규칙

#### 권장 사용
- `@Getter`, `@Setter`: DTO, Entity
- `@Builder`: 복잡한 객체 생성
- `@RequiredArgsConstructor`: 생성자 주입
- `@Slf4j`: 로깅
- `@NoArgsConstructor(access = PROTECTED)`: Entity

#### 제한 사용
- `@Data`: 사용 금지 (불필요한 Setter 생성)
- `@AllArgsConstructor`: 필요한 경우만 사용
- `@ToString`: 디버깅 목적으로만 사용

```java
// 좋은 예
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Task extends BaseTimeEntity {
    // ...
}

// 나쁜 예
@Entity
@Data  // Setter가 불필요하게 생성됨
public class Task extends BaseTimeEntity {
    // ...
}
```

### 어노테이션 사용 규칙

#### 필수 어노테이션
- `@Service`: Service 구현체
- `@Repository`: Repository 인터페이스
- `@RestController`: Controller
- `@Entity`: JPA Entity
- `@Transactional`: 트랜잭션 관리

#### 권한 체크
```java
@PreAuthorize("hasAnyRole('ADMIN', 'PROFESSOR')")
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasAuthority('READ_USER')")
```

#### 유효성 검증
```java
@NotNull(message = "{Field}는 필수입니다")
@Positive(message = "{Field}는 양수여야 합니다")
@Size(min = 1, max = 100, message = "{Field}는 1-100자 사이여야 합니다")
@Email(message = "올바른 이메일 형식이 아닙니다")
```

---

## 예외 처리

### 예외 계층 구조

```
RuntimeException
├── BusinessException          # 비즈니스 로직 예외
├── ResourceNotFoundException  # 리소스 없음 예외
├── AuthenticationException    # 인증 예외
└── ...
```

### 커스텀 예외 클래스

#### BusinessException
비즈니스 규칙 위반 시 사용

```java
@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
```

**사용 예시**
```java
if (taskRepository.existsByTitle(request.getTitle())) {
    throw new BusinessException(ErrorCode.DUPLICATE_RESOURCE, "이미 존재하는 Task입니다.");
}
```

#### ResourceNotFoundException
리소스를 찾을 수 없을 때 사용

```java
@Getter
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

**사용 예시**
```java
Task task = taskRepository.findById(taskId)
        .orElseThrow(() -> new ResourceNotFoundException("Task를 찾을 수 없습니다. " + taskId));
```

### ErrorCode 관리

#### ErrorCode Enum 구조
```java
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 공통 에러 (1000번대)
    INVALID_INPUT_VALUE(1000, "잘못된 입력값입니다"),
    METHOD_NOT_ALLOWED(1001, "허용되지 않은 메서드입니다"),
    ENTITY_NOT_FOUND(1002, "요청한 리소스를 찾을 수 없습니다"),
    
    // 인증/인가 에러 (2000번대)
    UNAUTHORIZED(2000, "인증이 필요합니다"),
    FORBIDDEN(2001, "접근 권한이 없습니다"),
    
    // 사용자 관련 에러 (3000번대)
    USER_NOT_FOUND(3000, "사용자를 찾을 수 없습니다"),
    
    // ... (도메인별로 번호대 분리)
    
    private final int code;
    private final String message;
}
```

#### ErrorCode 추가 규칙
1. **번호대 분리**: 도메인별로 1000단위 구분
2. **의미 있는 메시지**: 사용자에게 이해 가능한 메시지
3. **재사용 가능**: 공통 에러는 재사용

### GlobalExceptionHandler

#### 구조
```java
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleBusinessException(
            BusinessException e, HttpServletRequest request) {
        
        ErrorResponse errorResponse = ErrorResponse.of(
                e.getErrorCode(),
                request.getRequestURI()
        );
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(errorResponse.getMessage(), String.valueOf(errorResponse.getCode())));
    }
    
    // ... 기타 예외 처리
}
```

#### 예외 처리 우선순위
1. **커스텀 예외**: BusinessException, ResourceNotFoundException
2. **Spring 예외**: MethodArgumentNotValidException, BindException
3. **일반 예외**: Exception (최후의 수단)

### 예외 처리 규칙

#### Service Layer
```java
// 좋은 예
public TaskResponse getTask(Long taskId) {
    Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task를 찾을 수 없습니다. " + taskId));
    return taskMapper.toDto(task);
}

// 나쁜 예
public TaskResponse getTask(Long taskId) {
    Optional<Task> task = taskRepository.findById(taskId);
    if (task.isEmpty()) {
        return null;  // null 반환은 피함
    }
    return taskMapper.toDto(task.get());
}
```

#### Controller Layer
- 예외는 Service에서 처리
- Controller는 예외를 잡지 않음 (GlobalExceptionHandler가 처리)

---

## 공통 기능

### AOP 활용

#### @LogExecutionTime
메서드 실행 시간 측정

```java
@LogExecutionTime(level = "INFO")
public TaskResponse createTask(TaskRequest request) {
    // ...
}
```

**옵션**
- `level`: 로그 레벨 (DEBUG, INFO, WARN, ERROR)
- `includeMethodName`: 메서드명 포함 여부
- `includeClassName`: 클래스명 포함 여부
- `includeParameters`: 파라미터 정보 포함 여부

#### @LogMethod
메서드 실행 로깅

```java
@LogMethod(
    logStart = true,
    logEnd = true,
    logParameters = true,
    logReturnValue = false,
    logException = true,
    logExecutionTime = true
)
public TaskResponse createTask(TaskRequest request) {
    // ...
}
```

#### @Retryable
메서드 재시도 로직

```java
@Retryable(
    maxAttempts = 3,
    delay = 1000,
    exponentialBackoff = true,
    retryFor = {IOException.class},
    noRetryFor = {IllegalArgumentException.class}
)
public void sendEmail(String to, String subject, String body) {
    // ...
}
```

**옵션**
- `maxAttempts`: 최대 재시도 횟수
- `delay`: 재시도 간격 (밀리초)
- `exponentialBackoff`: 지수 백오프 사용 여부
- `retryFor`: 재시도할 예외 타입
- `noRetryFor`: 재시도하지 않을 예외 타입

### 공통 유틸리티

#### 상수 관리
```java
public class CommonConstants {
    // API 관련 상수
    public static final String API_VERSION = "v1";
    public static final String API_BASE_PATH = "/api/" + API_VERSION;
    
    // JWT 관련 상수
    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    public static final long JWT_ACCESS_TOKEN_EXPIRATION_TIME = 1800000;
    
    private CommonConstants() {
        // 유틸리티 클래스이므로 인스턴스화 방지
    }
}
```

#### 헬퍼 클래스
```java
public class MappingHelpers {
    
    @Named("formatDateTime")
    public String formatDateTime(LocalDateTime localDateTime) {
        if (localDateTime == null) return null;
        return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
    
    @Named("enumName")
    public String enumName(Enum<?> e) {
        return e == null ? null : e.name();
    }
}
```

### 공통 응답 형식

#### ApiResponse 구조
```java
{
    "success": true,
    "message": "성공",
    "data": { ... },
    "errorCode": null
}
```

#### 사용 예시
```java
// 성공 응답
return success(data, "Task 조회 성공");

// 생성 응답 (201)
return created(data, "Task가 성공적으로 생성되었습니다.");

// 페이징 응답
return successPage(page);

// 에러 응답 (GlobalExceptionHandler에서 처리)
// 자동으로 ApiResponse.error() 형식으로 변환
```

---

## 테스트 전략

### 단위 테스트

#### Service 테스트
```java
@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;
    
    @Mock
    private TaskMapper taskMapper;
    
    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    @DisplayName("Task 생성 성공")
    void createTask_Success() {
        // Given
        TaskRequest request = TaskRequest.builder()
                .taskTitle("테스트 Task")
                .build();
        
        Task task = Task.create(/* ... */);
        TaskResponse response = TaskResponse.builder()
                .taskId(1L)
                .taskTitle("테스트 Task")
                .build();
        
        when(taskRepository.save(any(Task.class))).thenReturn(task);
        when(taskMapper.toDto(task)).thenReturn(response);
        
        // When
        TaskResponse result = taskService.createTask(request);
        
        // Then
        assertThat(result.getTaskTitle()).isEqualTo("테스트 Task");
        verify(taskRepository).save(any(Task.class));
    }
}
```

#### Repository 테스트
```java
@DataJpaTest
class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;
    
    @Test
    @DisplayName("Cycle ID로 Task 조회")
    void findByCycleId_Success() {
        // Given
        Task task = Task.create(/* ... */);
        taskRepository.save(task);
        
        // When
        List<Task> tasks = taskRepository.findByCycleId(1L);
        
        // Then
        assertThat(tasks).hasSize(1);
        assertThat(tasks.get(0).getCycleId()).isEqualTo(1L);
    }
}
```

### 통합 테스트

#### Controller 테스트
```java
@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private TaskService taskService;
    
    @Test
    @DisplayName("Task 생성 API 테스트")
    void createTask_Success() throws Exception {
        // Given
        TaskRequest request = TaskRequest.builder()
                .taskTitle("테스트 Task")
                .build();
        
        TaskResponse response = TaskResponse.builder()
                .taskId(1L)
                .taskTitle("테스트 Task")
                .build();
        
        when(taskService.createTask(any(TaskRequest.class))).thenReturn(response);
        
        // When & Then
        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.taskTitle").value("테스트 Task"));
    }
}
```

### 테스트 커버리지 목표
- **단위 테스트**: 80% 이상
- **통합 테스트**: 주요 API 엔드포인트 100%
- **비즈니스 로직**: 90% 이상

---

## 코드 리뷰 체크리스트

### 아키텍처
- [ ] 계층 분리가 명확한가?
- [ ] 도메인별 패키지 구조를 따르는가?
- [ ] 공통 모듈을 적절히 활용하는가?

### 코딩 규칙
- [ ] 네이밍 컨벤션을 따르는가?
- [ ] 적절한 어노테이션을 사용하는가?
- [ ] Lombok을 올바르게 사용하는가?

### 예외 처리
- [ ] 적절한 예외 클래스를 사용하는가?
- [ ] ErrorCode를 올바르게 사용하는가?
- [ ] 예외 메시지가 명확한가?

### 성능
- [ ] N+1 문제가 없는가?
- [ ] 불필요한 쿼리가 없는가?
- [ ] 적절한 인덱스를 사용하는가?

### 보안
- [ ] 권한 체크가 적절한가?
- [ ] 입력값 검증이 있는가?
- [ ] SQL Injection 방지가 되어 있는가?

### 테스트
- [ ] 단위 테스트가 작성되었는가?
- [ ] 테스트 커버리지가 충분한가?
- [ ] 테스트가 명확하고 이해하기 쉬운가?

### 문서화
- [ ] JavaDoc이 작성되었는가?
- [ ] Swagger 문서화가 되어 있는가?
- [ ] 복잡한 로직에 주석이 있는가?

---

## 참고 자료

### 핵심 클래스
- `BaseController`: 공통 컨트롤러 기능
- `GlobalExceptionHandler`: 전역 예외 처리
- `ErrorCode`: 에러 코드 관리
- `ApiResponse`: 공통 응답 형식

### 공통 어노테이션
- `@LogExecutionTime`: 실행 시간 측정
- `@LogMethod`: 메서드 로깅
- `@Retryable`: 재시도 로직

### 유틸리티
- `CommonConstants`: 공통 상수
- `MappingHelpers`: 매핑 헬퍼
- `PasswordUtil`: 비밀번호 유틸리티

