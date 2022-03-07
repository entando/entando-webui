#!/bin/sh

runBuild () {
    SHOULD_CLEAN_TEST=$1
    BASEDIR=$(pwd)

    cd "$WORKDIR"
    
    if [ "$SHOULD_CLEAN_TEST" = true ]; then
        echo "Deleting before test: .next"
        rm -rf .next
    fi

    START=$(date +%s)
    # { yarn build 2> /dev/null ; } >> /dev/null
    yarn build
    END=$(date +%s)
    sumBuildTimer $END $START
    echo "Folder size: ">> $REPORT_PATH
    du -hs .next/standalone >> $REPORT_PATH
    du -hs .next/static >> $REPORT_PATH
    du -hs public >> $REPORT_PATH

    cd $BASEDIR
}

clean () {
    BASEDIR=$(pwd)
    cd $WORKDIR
    echo "Deleting: $TARGET_PATH"
    rm -rf $TARGET_PATH
    echo "Deleting: .next"
    rm -rf .next
    cd $BASEDIR
}

buildSSGSingle () {
    NUM=$1
    SHOULD_CLEAN_TEST=true
    echo "Starting SSG build benchmark on a single page generating multiple routes: SSG 1 -> n"
    SINGLE_PATH=$TARGET_PATH/[product]
    
    START=$(date +%s)
    
    rm -rf $SINGLE_PATH/data
    mkdir -p $SINGLE_PATH/data
    cp $PAGES_PATH/SSG-single.tsx $SINGLE_PATH/index.tsx
    cp "test-data-$NUM/products.json" $SINGLE_PATH/data/products.json

    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumPreparationTimer $END $START

    runBuild $SHOULD_CLEAN_TEST;
}

buildSSG () {
    NUM=$1
    SHOULD_CLEAN_TEST=true
    echo "Starting SSG benchmark with multiple generated pages: SSG n -> 1"
    
    START=$(date +%s)
    
    rm -rf $TARGET_PATH
    mkdir -p $TARGET_PATH
    cp "./test-data-$NUM"/pages-ssg/*.tsx $TARGET_PATH/

    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumPreparationTimer $END $START

    runBuild $SHOULD_CLEAN_TEST;
}

buildSG () {
    NUM=$1
    SHOULD_CLEAN_TEST=true
    echo "Starting SG benchmark with multiple generated pages without dynamic data"
    
    START=$(date +%s)
    
    rm -rf $TARGET_PATH
    mkdir -p $TARGET_PATH
    cp "./test-data-$NUM"/pages-sg/*.tsx $TARGET_PATH/

    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumPreparationTimer $END $START

    runBuild $SHOULD_CLEAN_TEST;
}

buildSSR () {
    NUM=$1
    SHOULD_CLEAN_TEST=true
    echo "Starting SSR benchmark with multiple dynamic pages"
    
    START=$(date +%s)
    
    rm -rf $TARGET_PATH
    mkdir -p $TARGET_PATH
    cp "./test-data-$NUM"/pages-ssr/*.tsx $TARGET_PATH/

    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumPreparationTimer $END $START

    runBuild $SHOULD_CLEAN_TEST;
}

rebuildSSGSingle () {
    rebuildApp $1 "$TARGET_PATH/[product]/index.txt"
}

rebuildSSG () {
    rebuildApp $1 $TARGET_PATH/*-1.tsx
}

rebuildSG () {
    rebuildApp $1 $TARGET_PATH/*-1.tsx
}

rebuildSSR () {
    rebuildApp $1 $TARGET_PATH/*-1.tsx
}


rebuildApp () {
    NUM=$1
    LOCATION=$2
    SHOULD_CLEAN_TEST=false
    echo "Starting nextjs app rebuild benchmark"
    
    START=$(date +%s)
    
    sed -r -i '' -e 's/h1/h2/g' $LOCATION

    END=$(date +%s)
    RESULT=$(echo "($END - $START)" | bc);
    sumPreparationTimer $END $START

    runBuild $SHOULD_CLEAN_TEST;
}
