# pr-practice

PR(Pull Request) 흐름을 익히기 위한 연습용 미니 프로젝트입니다.
빌드도, 의존성도 없습니다. **브랜치 → 커밋 → 푸시 → PR → 리뷰 → 머지** 흐름에만 집중합니다.

## 구성

```
pr-practice/
├── README.md                        프로젝트 소개
├── hello.js                         연습용 스크립트 (Node 실행)
├── docs/pr-guide.md                 PR 올리는 전체 순서 치트시트
└── .github/
    ├── pull_request_template.md     PR 본문 템플릿 (300자 기준)
    ├── labels.json                  이슈/PR 라벨 정의 (github-label-sync)
    └── workflows/label-sync.yml     라벨 자동 동기화
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

## 라벨 관리

이슈/PR 라벨은 GitHub 웹에서 직접 만들지 않고, [.github/labels.json](.github/labels.json)을
단일 진실 공급원으로 두고 [github-label-sync](https://github.com/Financial-Times/github-label-sync)로 맞춥니다.

```bash
# 1) 무엇이 바뀌는지 먼저 확인 (실제 변경 없음)
npx github-label-sync@3 --labels .github/labels.json --dry-run \
  --access-token <GITHUB_TOKEN> seobi-97/pr-practice

# 2) 실제 적용
npx github-label-sync@3 --labels .github/labels.json \
  --access-token <GITHUB_TOKEN> seobi-97/pr-practice
```

> ⚠️ `labels.json`에 없는 라벨은 **삭제됩니다.** 기존 라벨을 남기려면 `--allow-added-labels`를 붙이세요.
> 토큰은 [Personal access token](https://github.com/settings/tokens)에서 `repo` 스코프로 발급합니다.
> `GITHUB_ACCESS_TOKEN` 환경변수로 넘겨도 됩니다.

`main`에 `labels.json`이 머지되면 [label-sync.yml](.github/workflows/label-sync.yml)이 자동으로 동기화하므로,
평소에는 **파일만 고쳐서 PR을 올리면** 됩니다. 토큰 발급 없이 수동 실행하려면 Actions 탭 → Label Sync → Run workflow.

라벨 이름을 바꿀 때는 삭제 대신 `aliases`에 옛 이름을 적어주세요.
이미 그 라벨이 달려 있던 이슈/PR을 유지한 채 **이름만 바뀝니다.**

```json
{ "name": "✨ Feature", "color": "a2eeef", "aliases": ["enhancement", "feature"] }
```

GitHub이 새 레포에 기본으로 만들어주는 `bug`, `enhancement`, `documentation`, `question` 등도
`aliases`에 적어두면 삭제되지 않고 우리 라벨로 전환됩니다.
