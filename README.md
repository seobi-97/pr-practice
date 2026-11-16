# pr-practice

PR(Pull Request) 흐름을 익히기 위한 연습용 미니 프로젝트입니다.
빌드도, 의존성도 없습니다. **브랜치 → 커밋 → 푸시 → PR → 리뷰 → 머지** 흐름에만 집중합니다.

## 구성

```
pr-practice/
├── README.md                        프로젝트 소개
├── hello.js                         연습용 스크립트 (Node 실행)
├── docs/pr-guide.md                 PR 올리는 전체 순서 치트시트
└── .github/pull_request_template.md PR 본문 템플릿 (300자 기준)
```

## 실행

```bash
node hello.js
```

## PR 연습 순서

1. `main`에서 작업 브랜치를 딴다 — `git switch -c feature/작업이름`
2. 코드를 고치고 커밋한다 — `git add -A && git commit -m "..."`
3. 브랜치를 올린다 — `git push -u origin feature/작업이름`
4. GitHub에서 **Compare & pull request** 버튼을 눌러 PR을 연다
5. 템플릿에 맞춰 본문을 300자 내외로 채운다
6. 리뷰 받고 **Merge pull request** → 작업 브랜치 삭제
7. 로컬 정리 — `git switch main && git pull && git branch -d feature/작업이름`

자세한 설명은 [docs/pr-guide.md](docs/pr-guide.md) 참고.

## 브랜치 규칙 (이 레포 기준)

| 접두사 | 용도 |
| --- | --- |
| `feature/` | 기능 추가 |
| `fix/` | 버그 수정 |
| `docs/` | 문서만 수정 |
| `refactor/` | 동작 변화 없는 구조 개선 |
