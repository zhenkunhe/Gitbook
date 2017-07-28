---
presentation:
  width: 800
  height: 600
  controls: false
---

<!-- slide -->

## Git
- `git clone ssh://git@10.255.131.159:10022/Alex_Hoh/gwFramework.git`

<!-- slide class:"my-id" -->

## Introduction - Event Publish & Subscribe
``` puml
@startuml
scale 1.5
left to right direction
    frame "Gateway Process" {

      [Parameter Manager] as PM

      [Event Manager] as EM

      [Log Manager] as LM

      node "Module Sub" {
          [Subscribe Thread] as ST
          (Callback C) <-up- ST : 3
          (Callback C) -up-> ST : Done
          (Callback B) <-up- ST : 2
          (Callback B) -up-> ST : Done
          (Callback A) <-up- ST : 1
          (Callback A) -up-> ST : Done
          ST <-up- EM
      }

      node "Module Pub" {
          [Publish Thread] as PT
          (Event C) -up-> PT : Pass 3
          (Event B) -up-> PT : Pass 2
          (Event A) -up-> PT : Pass 1
          PT -up-> EM
      }

    }
@enduml
```
