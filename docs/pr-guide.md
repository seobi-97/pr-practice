# PR 올리는 전체 순서

기존에 하던 `작업 → 커밋 → 푸시 → 머지`에서 **브랜치**와 **PR** 두 단계가 추가된 것뿐입니다.

```
[기존]  main에서 작업 → commit → push → (바로 반영)
[PR]    브랜치 생성 → 작업 → commit → push → PR 생성 → 리뷰 → merge → 브랜치 정리
```

---

## 1. 작업 브랜치 만들기

`main`은 항상 깨끗하게 두고, 작업은 별도 브랜치에서 합니다.

```bash
git switch main
git pull                      # 최신 상태로 맞추고 시작
git switch -c feature/greeting-message
```

> `switch -c`는 "브랜치를 새로 만들면서 그쪽으로 이동". 예전 `checkout -b`와 같습니다.

## 2. 작업하고 커밋

```bash
git add -A
git commit -m "feat: 인사말에 시간대별 문구 추가"
```

커밋 메시지는 `타입: 내용` 형태가 일반적입니다.
`feat`(기능) / `fix`(수정) / `docs`(문서) / `refactor`(구조 개선) / `chore`(잡일)

## 3. 브랜치 푸시

```bash
git push -u origin feature/greeting-message
```

`-u`는 로컬 브랜치와 원격 브랜치를 연결해 두는 옵션입니다.
이후부터는 같은 브랜치에서 `git push`만 쳐도 됩니다.

## 4. PR 생성 (GitHub 웹)

1. 푸시 직후 레포 상단에 뜨는 **Compare & pull request** 버튼 클릭
   (안 보이면 `Pull requests` 탭 → `New pull request` → 브랜치 선택)
2. `base: main` ← `compare: feature/greeting-message` 인지 확인
3. 제목은 커밋 메시지처럼 한 줄로
4. 본문은 자동으로 채워지는 템플릿을 300자 내외로 작성
5. **Create pull request**

## 5. 리뷰 반영

리뷰 코멘트를 받으면 **같은 브랜치에서** 고치고 다시 푸시하면 됩니다.
PR을 새로 만들 필요 없이, 푸시한 커밋이 기존 PR에 자동으로 붙습니다.

```bash
git add -A
git commit -m "fix: 리뷰 반영 - 함수명 수정"
git push
```

## 6. 머지하고 정리

1. GitHub에서 **Merge pull request** → **Confirm merge**
2. **Delete branch** 버튼으로 원격 브랜치 삭제
3. 로컬 정리

```bash
git switch main
git pull
git branch -d feature/greeting-message
```

---

## PR 본문 예시 (약 300자)

> ## 작업 내용
> 인사말이 항상 "Hello"로 고정되어 있어, 실행 시간대에 맞는 문구가 나오도록 변경했습니다.
>
> ## 변경 사항
> - `greet()`에 시간대 판별 로직 추가 (아침/낮/저녁)
> - 기본 인자 `world` 유지해 기존 호출부 영향 없음
>
> ## 확인 방법
> ```bash
> node hello.js 경섭
> ```
>
> ## 참고
> - 시간은 서버 로컬 타임존 기준입니다.

---

## 자주 겪는 상황

| 상황 | 해결 |
| --- | --- |
| `main`에서 실수로 작업함 | `git switch -c feature/이름` 하면 변경사항이 그대로 따라옵니다 |
| 커밋 메시지를 잘못 씀 (푸시 전) | `git commit --amend -m "새 메시지"` |
| 푸시했는데 PR 버튼이 안 보임 | `Pull requests` 탭 → `New pull request`에서 브랜치 직접 선택 |
| PR 중간에 `main`이 바뀜 | `git switch main && git pull` 후 작업 브랜치에서 `git merge main` |
| 머지된 브랜치가 로컬에 남음 | `git branch -d 브랜치명` (원격은 `git fetch -p`로 정리) |
