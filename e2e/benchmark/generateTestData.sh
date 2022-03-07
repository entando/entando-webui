GENERATION_TIME=0;

OVERALL_START=$(date +%s)

PAGES_PATH=$(pwd)/pages

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

generatePages () {
    NUM=$1
    TARGET_PATH="./test-data-$NUM/pages"
    for ((i = 1; i <= $NUM; i++)); do
        cp $PAGES_PATH/SSR.tsx "$TARGET_PATH-ssr/SSR-$i.tsx"
        cp $PAGES_PATH/SSG.tsx "$TARGET_PATH-ssg/SSG-$i.tsx"
        cp $PAGES_PATH/SG.tsx "$TARGET_PATH-sg/SG-$i.tsx"
    done
}

VALUES=(10 100 1000 10000 100000)

echo "STARTING TEST DATA GENERATION"
echo "-------------------------"

for NUM in "${VALUES[@]}"
do
   : 
   START=$(date +%s)
   echo "Generating test data: $NUM"
   
   rm -rf "./test-data-$NUM"
   mkdir -p "./test-data-$NUM/pages-ssr"
   mkdir -p "./test-data-$NUM/pages-ssg"
   mkdir -p "./test-data-$NUM/pages-sg"
   JSON_FILE="./test-data-$NUM/products.json"

   createJSONFile $JSON_FILE $NUM
   generatePages $NUM
   
   END=$(date +%s) 
   TIME=$(echo "$END - $START" | bc)
   echo "Time spent to generate $NUM: $TIME"
done

OVERALL_END=$(date +%s)  
OVERALL_RESULT=$(echo "$OVERALL_END - $OVERALL_START" | bc)

echo "-------------------------"
echo "TEST DATA GENERATION"
echo "-------------------------"
echo "The total time to generate the test data was: $OVERALL_RESULT seconds";