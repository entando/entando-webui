source ./ssr.sh
source ./ssg.sh

BUILD_TIME=0;
GENERATION_TIME=0;

OVERALL_START=$(date +%s)

sumBuildTimer () {
    BUILD_TIME=$(echo "$BUILD_TIME + ($1 - $2)" | bc);
}

sumGenerationTimer () {
    GENERATION_TIME=$(echo "$GENERATION_TIME + ($1 - $2)" | bc);
}

NUM=$1

rm -rf ./results.md
touch ./results.md

echo "# BENCHMARK TEST" >> results.md

echo "STARTING BENCHMARK TEST"
echo "-------------------------"

testSSR $NUM
testSSG $NUM
testSG $NUM
testSSGSingle $NUM

OVERALL_END=$(date +%s)  

OVERALL_RESULT=$(echo "$OVERALL_END - $OVERALL_START" | bc)

echo " " >> results.md
echo " " >> results.md
echo "## FINAL RESULTS" >> results.md
echo "-------------------------"  >> results.md
echo "- Build time: $BUILD_TIME seconds  " >> results.md
echo "- Generation time: $GENERATION_TIME seconds  " >> results.md
echo "- Total time: $OVERALL_RESULT seconds  " >> results.md

echo "-------------------------"
echo "BENCHMARK TEST COMPLETED"
echo "-------------------------"
echo "The total build time was: $BUILD_TIME seconds";
echo "The total time to generate all pages was: $GENERATION_TIME seconds";
echo "TOTAL time spent: $OVERALL_RESULT seconds";