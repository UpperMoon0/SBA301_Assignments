package com.sba301.group1.pes_be.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Grade {

    SEED("seed", 3),
    BUD("bud", 4),
    LEAF("leaf", 5);

    private final String name;
    private final int age;
}
