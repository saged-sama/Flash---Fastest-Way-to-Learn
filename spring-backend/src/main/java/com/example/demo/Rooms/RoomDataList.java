package com.example.demo.Rooms;

import java.util.List;

public class RoomDataList {
    private List<RoomData> data;

    public RoomDataList(List<RoomData> data) {
        this.data = data;
    }

    public RoomDataList() {
    }

    public List<RoomData> getData() {
        return data;
    }

    public void setData(List<RoomData> data) {
        this.data = data;
    }
}
