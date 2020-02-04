package com.thoughtworks;

public class ArrayPractice4 {

    /**
     * 完成本方法实现功能: 将一个数字插入到给定的已经排好序的数组中，要求插入以后数组依然是有序的
     */
    public static int[] insert(int number) {
        int[] array = new int[]{1, 20, 50, 100};
        int arrayLength = array.length;
        int insertIndex = 0;
        int[] insertArray = new int[arrayLength + 1];
        for (int i = 0; i < arrayLength; i++) {
            if (number > array[i]) {
                insertIndex++;
            } else {
                break;
            }
        }
        for (int i = 0; i <= arrayLength; i++) {
            if (i < insertIndex) {
                insertArray[i] = array[i];
            } else if (i == insertIndex) {
                insertArray[i] = number;
            } else {
                insertArray[i] = array[i - 1];
            }
        }
        return insertArray;
    }
}
