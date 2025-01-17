package com.example.demo.Utilities;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class DynamicScheduler {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10);

    public void scheduleTask(Runnable task, LocalDateTime time){
        if(time.compareTo(LocalDateTime.now()) <= 0){
            return;
        }
        long delay = calculateDelay(time);
        scheduler.schedule(task, delay, TimeUnit.MILLISECONDS);
    }

    private long calculateDelay(LocalDateTime time) {
        LocalDateTime now = LocalDateTime.now();
        return time.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() - now.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}
