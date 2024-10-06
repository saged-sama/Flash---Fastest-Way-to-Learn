package com.example.demo.Utilities;
import java.lang.reflect.Field;

public class EntityUpdate {

    public static <T1, T2> void merge(T1 existingEntity, T2 updatedEntity) {
        Field[] fields = updatedEntity.getClass().getDeclaredFields();

        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object updatedValue = field.get(updatedEntity);
                
                if (updatedValue != null) {
                    field.set(existingEntity, updatedValue);
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Failed to update entity", e);
            }
        }
    }
}