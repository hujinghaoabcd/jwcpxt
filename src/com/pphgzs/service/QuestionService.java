package com.pphgzs.service;

import com.pphgzs.domain.DO.jwcpxt_question;
import com.pphgzs.domain.VO.QuestionVO;

public interface QuestionService {

	public QuestionVO get_questionVO(QuestionVO questionVO);

	public boolean save_question(jwcpxt_question question);

	public boolean update_question(jwcpxt_question question);

}
