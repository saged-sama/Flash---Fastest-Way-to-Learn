package com.example.demo.Utilities;

import java.lang.reflect.Field;

public class EntityUpdate {

    public static <T1, T2> void merge(T1 existingEntity, T2 updatedEntity) {
        if (existingEntity == null || updatedEntity == null) {
            throw new IllegalArgumentException("Entities cannot be null");
        }

        Field[] updatedFields = updatedEntity.getClass().getDeclaredFields();

        for (Field updatedField : updatedFields) {
            try {
                updatedField.setAccessible(true);
                Object updatedValue = updatedField.get(updatedEntity);

                if (updatedValue == null) {
                    continue;
                }

                Field existingField;
                try {
                    existingField = existingEntity.getClass().getDeclaredField(updatedField.getName());
                } catch (NoSuchFieldException e) {
                    continue;
                }

                if (!existingField.getType().equals(updatedField.getType())) {
                    continue;
                }

                existingField.setAccessible(true);
                existingField.set(existingEntity, updatedValue);
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Failed to update field: " + updatedField.getName(), e);
            }
        }
    }
}
