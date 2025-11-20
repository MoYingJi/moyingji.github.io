# 旮旯给木里面不是这样的！

## GitHub

你怎么能直接 commit 到我的 main 分支啊？！GitHub 上不是这样！你应该先 fork 我的仓库，然后从 develop 分支 checkout 一个新的 feature 分支，比如叫 `feature/confession`。然后你把你的心意写成代码，并为它写好单元测试和集成测试，确保代码覆盖率达到 95% 以上。接着你要跑一下 Linter，通过所有的代码风格检查。然后你再 commit，commit message 要遵循 Conventional Commits 规范。之后你把这个分支 push 到你自己的远程仓库，然后给我提一个 Pull Request。在 PR 描述里，你要详细说明你的功能改动和实现思路，并且 @ 我和至少两个其他的评审。我们会 review 你的代码，可能会留下一些评论，你需要解决所有的 thread。等 CI/CD 流水线全部通过，并且拿到至少两个 LGTM 之后，我才会考虑把你的分支 squash and merge 到 develop 里，等待下一个版本发布。你怎么直接上来就想 force push 到 main？！GitHub 上根本不是这样！我拒绝合并！

## Rust

你怎么能在生产环境里直接 `unwrap()` 啊？！Rust 不是这样用的！你应该先认真设计一个靠谱的错误类型，用 thiserror 或 anyhow 包装好上下文信息，然后在每一层调用链里用 `?` 把错误优雅地向上传递。遇到可能出现网络抖动、I/O 超时、序列化失败这种情况，你要先写好健壮的重试逻辑、退避策略和熔断机制，并且在日志里带上 trace id，这样 SRE 才能在凌晨三点定位问题。然后你要写单元测试，把所有可能失败的路径都测一遍；集成测试里还要模拟网络异常和依赖服务挂掉的情况，确保你的代码不会一言不合就 panic。接着你要跑一下 clippy，把所有 `consider handling the Result instead of unwrapping` 的警告都修干净；还要跑 rustfmt，让代码风格保持一致。之后你才可以 commit 然后 push 。你 push 上去之后，CI 会跑 `cargo test`、`cargo check`、`cargo clippy`、`cargo fmt –check`，还有压力测试确保你的服务在压力下不会因为一个 `unwrap()` 就直接把整个服务集群带走。等 PR 至少经过两位 reviewer、三个 LGTM，并且 SRE 点头同意这个改动不会再次导致全球范围的 5xx 风暴之后，我才会考虑把你的分支 merge 进去。你怎么上来就直接在关键路径 `unwrap()`？！Rust 根本不是这样写的！我拒绝合并！
