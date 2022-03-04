source ./buildFunctions.sh
source ./cleanTest.sh

sumBuildTimer () {
    BUILD_TIME=$(echo "$BUILD_TIME + ($1 - $2)" | bc);
}

sumPreparationTimer () {
    PREPARATION_TIME=$(echo "$PREPARATION_TIME + ($1 - $2)" | bc);
}

# export NODE_OPTIONS="--max-old-space-size=16384"

# Read 'n' from input
#[[ ! -z "$1" ]] && NUM="$1" || NUM="10"

VALUES=(10 100 1000 10000 100000)

REPORT_PATH=$(pwd)/results.md
PAGES_PATH=./pages
BASEDIR=$(pwd)
WORKDIR=../../starters/barebone-nextjs-engine
TARGET_PATH=$WORKDIR/pages/benchmark

clean;
rm -rf $REPORT_PATH
touch $REPORT_PATH

echo "# BENCHMARK TEST\n" >> $REPORT_PATH

buildFn=buildSSGSingle
rebuildFn=rebuildSSGSingle

for NUM in "${VALUES[@]}"; do
    echo "## FULL BUILD TEST: $NUM" >> $REPORT_PATH
    echo "---------------------------------" >> $REPORT_PATH

    BUILD_TIME=0;
    PREPARATION_TIME=0;

    TEST_START=$(date +%s)
    $buildFn $NUM
    TEST_END=$(date +%s)
    TEST_RESULT=$(echo "$TEST_END - $TEST_START" | bc)
    
    echo "---------------------------------" >> $REPORT_PATH
    echo "- Preparation time: $PREPARATION_TIME seconds" >> $REPORT_PATH
    echo "- Build time: $BUILD_TIME seconds" >> $REPORT_PATH
    echo "- Total time: $TEST_RESULT seconds\n" >> $REPORT_PATH

    echo "## REBUILD TEST: $NUM" >> $REPORT_PATH
    echo "---------------------------------" >> $REPORT_PATH

    BUILD_TIME=0;
    PREPARATION_TIME=0;

    TEST_START=$(date +%s)
    $rebuildFn $NUM
    TEST_END=$(date +%s)
    TEST_RESULT=$(echo "$TEST_END - $TEST_START" | bc)
    
    echo "---------------------------------" >> $REPORT_PATH
    echo "- Preparation time: $PREPARATION_TIME seconds" >> $REPORT_PATH
    echo "- Build time: $BUILD_TIME seconds" >> $REPORT_PATH
    echo "- Total time: $TEST_RESULT seconds\n" >> $REPORT_PATH
done

clean;