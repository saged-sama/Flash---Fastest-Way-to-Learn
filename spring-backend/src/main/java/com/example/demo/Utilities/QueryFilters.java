package com.example.demo.Utilities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.function.BinaryOperator;
import java.util.function.Function;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QueryFilters<T> {

    public Specification<T> buildSpecification(String filterString) {
        // Clean and tokenize the filter string
        if(filterString == null || filterString.isEmpty()){
            return null;
        }
        String cleanedFilter = filterString.replaceAll("\\s+", ""); // Remove extra spaces
        return parseExpression(cleanedFilter);
    }

    private Specification<T> parseExpression(String expression) {
        // Handle OR (`||`)
        String[] orParts = splitByLogicalOperator(expression, "||");
        if (orParts.length > 1) {
            return combineSpecifications(orParts, this::parseExpression, Specification::or);
        }

        // Handle AND (`&&`)
        String[] andParts = splitByLogicalOperator(expression, "&&");
        if (andParts.length > 1) {
            return combineSpecifications(andParts, this::parseExpression, Specification::and);
        }

        // Parse relational conditions (e.g., `a <= 1`, `b = "iooo"`)
        return parseCondition(expression);
    }

    @SuppressWarnings({ "unchecked", "unused", "rawtypes" })
    private Specification<T> parseCondition(String condition) {
        Pattern pattern = Pattern.compile("([a-zA-Z0-9_.]+)(=|!=|<=|>=|<|>|~|!~)(\".*\"|[^,]*)");
        Matcher matcher = pattern.matcher(condition);
    
        if (matcher.matches()) {
            String field = matcher.group(1);
            String operator = matcher.group(2);
            String value = matcher.group(3).replace("\"", "");
    
            return (root, query, criteriaBuilder) -> {
                Path<Object> path = resolvePath(root, field);
    
                switch (operator) {
                    case "=":
                        return criteriaBuilder.equal(path, parseValue(path, value));
                    case "!=":
                        return criteriaBuilder.notEqual(path, parseValue(path, value));
                    case "<":
                        return criteriaBuilder.lessThan((Expression<? extends Comparable>) path, (Comparable) parseValue(path, value));
                    case "<=":
                        return criteriaBuilder.lessThanOrEqualTo(path.as(Comparable.class), (Comparable) parseValue(path, value));
                    case ">":
                        return criteriaBuilder.greaterThan(path.as(Comparable.class), (Comparable) parseValue(path, value));
                    case ">=":
                        return criteriaBuilder.greaterThanOrEqualTo(path.as(Comparable.class), (Comparable) parseValue(path, value));
                    case "~":
                        return criteriaBuilder.like(path.as(String.class), "%" + value + "%");
                    case "!~":
                        return criteriaBuilder.notLike(path.as(String.class), "%" + value + "%");
                    default:
                        throw new IllegalArgumentException("Unknown operator: " + operator);
                }
            };
        }
    
        throw new IllegalArgumentException("Invalid condition: " + condition);
    }
    
    private Path<Object> resolvePath(Root<?> root, String field) {
        // Split the field by '.' to handle nested paths
        String[] parts = field.split("\\.");
        Path<Object> path = root.get(parts[0]);
    
        // Traverse through nested fields
        for (int i = 1; i < parts.length; i++) {
            path = path.get(parts[i]);
        }
    
        return path;
    }
    
    

    private Specification<T> combineSpecifications(String[] parts, Function<String, Specification<T>> parser, BinaryOperator<Specification<T>> combiner) {
        return Arrays.stream(parts)
                .map(parser)
                .reduce(combiner)
                .orElseThrow(() -> new IllegalArgumentException("Failed to combine specifications."));
    }

    private String[] splitByLogicalOperator(String expression, String operator) {
        // Use regex to split by the logical operator but keep parentheses grouping intact
        List<String> parts = new ArrayList<>();
        int level = 0, start = 0;

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '(') level++;
            else if (c == ')') level--;
            else if (expression.startsWith(operator, i) && level == 0) {
                parts.add(expression.substring(start, i));
                start = i + operator.length();
            }
        }

        parts.add(expression.substring(start));
        return parts.toArray(new String[0]);
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    private Comparable<?> parseValue(Path<Object> path, String value) {
        // Infer the type from the Path's Java type
        Class<?> type = path.getJavaType();
    
        if (type == String.class) {
            return value;
        } else if (type == Integer.class || type == int.class) {
            return Integer.parseInt(value);
        } else if (type == Double.class || type == double.class) {
            return Double.parseDouble(value);
        } else if (type == Boolean.class || type == boolean.class) {
            return Boolean.parseBoolean(value);
        } else if (type.isEnum()) {
            Class<? extends Enum> enumType = (Class<? extends Enum>) type;
            return Enum.valueOf(enumType, value.toUpperCase());
        } else if (type == UUID.class) {
            return UUID.fromString(value);
        } else {
            throw new IllegalArgumentException("Unsupported type for value: " + type);
        }
    }

    public static Sort parseSort(String sort){
        if(sort == null || sort.isEmpty()){
            return Sort.unsorted();
        }
        List<Sort.Order> orders = Arrays.stream(sort.split(",")).map(
            order -> {
                boolean isDesc = order.startsWith("-");
                String field = order.replaceFirst("[-+]", "");
                System.out.println("Field: " + field);
                return isDesc ? Sort.Order.desc(field) : Sort.Order.asc(field);
            }
        ).toList();
        return Sort.by(orders);
    }
}
