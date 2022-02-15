#!/bin/sh

# Pages path from src
PAGES_PATH=./pages
TARGET_PATH=../pages/benchmark

runBuild () {
    # clean build folder
    rm -rf ../.next

    START=$(date +%s)
    { yarn build 2> /dev/null ; } >> /dev/null
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumBuildTimer $END $START
    echo "Build time: $RESULT  " >> ./results.md
    echo "Folder size: ">> ./results.md
    du -hs ../.next >> ./results.md
    echo " ">> ./results.md
    echo "---">> ./results.md

    rm -rf $TARGET_PATH
}

createJSONFile () {
    touch $1
    echo "[" >> $1
    for ((i = 1; i <= $2; i++)); do
        echo "  {" >> $1
        echo "    \"name\": \"product-$i\"" >> $1
        if [ $i == $2 ]; then
            echo "  }" >> $1
        else
            echo "  }," >> $1
        fi
    done
    echo "]" >> $1
}

testSSG () {
    NUM=$1
    echo "Starting SSG benchmark with multiple generated pages..."
    mkdir $TARGET_PATH
    cp -R $PAGES_PATH/data $TARGET_PATH/data

    echo "SSG - generating ${NUM} pages"

    echo "## SSG Test Results" >> ./results.md

    START=$(date +%s)
    for ((i = 1; i <= $NUM; i++)); do
        cp $PAGES_PATH/SSG.tsx $TARGET_PATH/SSG-$i.tsx
    done
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumGenerationTimer $END $START
    echo "Generating time: $RESULT  " >> ./results.md

    runBuild;
}

testSG () {
    NUM=$1
    echo "Starting SG benchmark with multiple generated pages without dynamic data..."
    mkdir $TARGET_PATH

    echo "SG - generating ${NUM} pages"

    echo "## SG Test Results" >> ./results.md

    START=$(date +%s)
    for ((i = 1; i <= $NUM; i++)); do
        cp $PAGES_PATH/SG.tsx $TARGET_PATH/SG-$i.tsx
    done
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumGenerationTimer $END $START
    echo "Generating time: $RESULT  " >> ./results.md

    runBuild;
}


testSSGSingle () {
    NUM=$1
    echo "Starting SSG benchmark on a single page generating multiple routes..."
    SINGLE_PATH=$TARGET_PATH/[product]
    mkdir $TARGET_PATH
    mkdir $SINGLE_PATH
    mkdir $SINGLE_PATH/data

    echo "SSG - generating JSON file with ${NUM} entries"

    echo "## SSG - Single page Test Results" >> ./results.md

    START=$(date +%s)
    JSON_FILE=$SINGLE_PATH/data/products.json

    createJSONFile $JSON_FILE $NUM
    
    cp $PAGES_PATH/SSG-single.tsx $SINGLE_PATH/SSG-single.tsx
    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumGenerationTimer $END $START
    echo "Generating time: $RESULT  " >> ./results.md

    runBuild;
}
