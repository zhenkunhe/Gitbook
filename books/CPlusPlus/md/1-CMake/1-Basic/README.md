# Basic

tags: cmake

<!-- sec data-title="Target properties" data-id="1" data-nopdf="true" ces -->

file(GLOB gateway_lib_c ${gateway_sources}/*.c)
list(REMOVE_ITEM gateway_lib_c "${gateway_sources}/main.c")

``` cmake
unset(dep_library CACHE)
find_library(dep_library 
        NAMES ${dep} 
        HINTS ${CMAKE_CURRENT_SOURCE_DIR}/../build/${CMAKE_SYSTEM_NAME}/${TARGET_ARCHITECTURE}/${CMAKE_BUILD_TYPE}/deps/${dep}/lib
)
TARGET_LINK_LIBRARIES(${PROJECT_NAME}_bin ${dep_library})
```

PERMISSIONS，用以指定檔案存取權限，可用的選項有 OWNER_READ、OWNER_WRITE、OWNER_EXECUTE、GROUP_READ、GROUP_WRITE、 GROUP_EXECUTE、WORLD_READ、WORLD_WRITE、WORLD_EXECUTE、SETUID、SETGID。在不支援這些權限設定的平台上會自動忽略。

``` cmake
EXECUTE_PROCESS( COMMAND command COMMAND tr -d '\n' OUTPUT_VARIABLE ARCHITECTURE )
message( STATUS "Architecture: ${ARCHITECTURE}" )
```

``` cmake
include(${CMAKE_CURRENT_SOURCE_DIR}/../A/CMakeLists.txt)
```

``` cmake
TARGET_LINK_LIBRARIES(myProject hello)，连接libhello.so库
TARGET_LINK_LIBRARIES(myProject libhello.a)
TARGET_LINK_LIBRARIES(myProject libhello.so)
TARGET_LINK_LIBRARIES(myProject -lhello)
```

``` cmake
set(V  alpha beta gamma)
message(${V})

foreach(i  ${V})
    message(${i})
endforeach()
```

CMAKE_CURRENT_SOURCE_DIR
目前正在處理的 CMakeLists.txt 所在位置。
CMAKE_CURRENT_BINARY_DIR
目前正在處理的 CMakeLists.txt 對應的建置資料夾位置。當然，在 in-source build 時和 CMAKE_CURRENT_SOURCE_DIR 相同。
CMAKE_BINARY_DIR

<!--endsec-->