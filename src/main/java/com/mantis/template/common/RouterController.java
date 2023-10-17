package com.mantis.template.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouterController {

	@GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() { 
        return "forward:/";
    }
}
