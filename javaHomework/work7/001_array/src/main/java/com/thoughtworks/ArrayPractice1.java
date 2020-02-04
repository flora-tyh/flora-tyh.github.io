package com.thoughtworks;

import java.util.Arrays;

public class ArrayPractice1 {

    public static void main(String[] args) {
        printArrayReverse();
    }

    /**
     * 倒序打印给定数组,打印格式为: [3,2,1]
     */
    public static void printArrayReverse() {
        int[] array = new int[]{1, 2, 3};
        for (int min = 0, max = array.length - 1; min < max; min++, max--) {
            int temp = array[min];
            array[min] = array[max];
            array[max] = temp;
        }
        System.out.println(Arrays.toString(array));
    }
}
