package com.example.demo.Utilities;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FilterToSqlQuery {

    public static String convertFilterToSql(String filter) {
        String regex = "(\\([^)]+\\))|([a-zA-Z0-9_]+)([=><!~?]{1,2})([\\'\\\"a-zA-Z0-9_,\\-\\'\\.\\(\\)\\:\\s]+)"; 

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(filter);

        StringBuilder sqlQuery = new StringBuilder("WHERE ");

        boolean firstCondition = true;

        while (matcher.find()) {
            // String condition = matcher.group(0);
            String column = matcher.group(2);
            String operator = matcher.group(3);
            String value = matcher.group(4);

            if (!firstCondition) {
                sqlQuery.append(" AND ");
            }
            firstCondition = false;

            sqlQuery.append(getSqlCondition(column, operator, value));
        }

        return sqlQuery.toString();
    }

    private static String getSqlCondition(String column, String operator, String value) {
        switch (operator) {
            case "=":
                return column + " = '" + value + "'";
            case "!=":
                return column + " <> '" + value + "'";
            case ">":
                return column + " > '" + value + "'";
            case ">=":
                return column + " >= '" + value + "'";
            case "<":
                return column + " < '" + value + "'";
            case "<=":
                return column + " <= '" + value + "'";
            case "~":
                return column + " LIKE '%" + value + "%'";
            case "!~":
                return column + " NOT LIKE '%" + value + "%'";
            case "?=":
                return column + " IN (" + value + ")";
            case "?!=":
                return column + " NOT IN (" + value + ")";
            case "?>":
                return column + " > ANY (" + value + ")";
            case "?>=":
                return column + " >= ANY (" + value + ")";
            case "?<":
                return column + " < ANY (" + value + ")";
            case "?<=":
                return column + " <= ANY (" + value + ")";
            case "?~":
                return column + " LIKE '%" + value + "%'";
            case "?!~":
                return column + " NOT LIKE '%" + value + "%'";
            default:
                return "";
        }
    }

    public static void main(String[] args) {
        // Test example
        String filter = "(id='abc' && created>'2022-01-01')";
        String sqlQuery = convertFilterToSql(filter);
        System.out.println("Generated SQL Query: " + sqlQuery);
    }
}
