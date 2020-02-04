package com.thoughtworks;

public class ArrayPractice3 {
    /**
     * 完成本方法实现功能: 将一个整型数组array中值0的元素去掉，并把剩下的元素组成新的数组
     */
    public static int[] filterZero(int[] array) {
        int countZero = 0;
        for (int i = 0; i < array.length; i++) {
            if (array[i] == 0) {
                countZero++;
            }
        }
        int[] arrayNoZero = new int[array.length - countZero];
        for (int i = 0, j = 0; i < array.length; i++) {
            if (array[i] != 0) {
                arrayNoZero[j] = array[i];
                j++;
            }
        }
        return arrayNoZero;
    }
}
