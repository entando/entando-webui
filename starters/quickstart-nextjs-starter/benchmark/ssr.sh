#!/bin/sh

# Pages path from src
PAGES_PATH=./pages
TARGET_PATH=../pages/benchmark

testSSR () {
    NUM_PAGES=$1
    mkdir $TARGET_PATH
    cp -R $PAGES_PATH/data $TARGET_PATH/data

    echo "SSR - generating ${NUM_PAGES} pages"
    echo "## SSR Test Results" >> ./results.md
    START=$(date +%s)
    for ((i = 1; i <= $NUM_PAGES; i++)); do
        cp $PAGES_PATH/SSR.tsx $TARGET_PATH/SSR-$i.tsx
    done
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumGenerationTimer $END $START
    echo "Generating time: $RESULT  " >> ./results.md

    # clean build folder
    rm -rf ../.next

    START=$(date +%s)
    { yarn build 2> /dev/null ; } >> /dev/null
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumBuildTimer $END $START
    echo "Build time: $RESULT  " >> ./results.md
    echo "Folder size">> ./results.md
    du -hs ../.next >> ./results.md
    echo " ">> ./results.md
    echo "---">> ./results.md

    rm -rf $TARGET_PATH
}



