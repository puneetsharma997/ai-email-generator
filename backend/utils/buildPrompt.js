// function to generate a email prompt
export const emailPrompt = (data) => {
  return (
    `Generate a ${data?.tone}, well-structured email based on the following parameters:
      Email Type: ${data?.type}
      Tone: ${data?.tone}
      Recipient Name: ${data?.recipient}
      Subject: ${data?.subject}
      Desired Length: ${data?.length}

      Context / Details:
      ${data?.context}

      STRICT RULES (follow all):
      - Do NOT use placeholders like [your name], [achievement], [example], or any bracketed content.
      - Do NOT suggest what could be added. Just write the final complete email.
      - Do NOT include example text or hypothetical statements such as "mention this..." or "for example…".
      - Do NOT include anything that requires the user to fill in later.
      - Replace everything with natural, complete, human-sounding sentences.
      - Write as if you already know all missing details.
      - The email should be fully polished and directly ready to copy and send.
      - Use clear, correct, professional English with proper grammar, punctuation, and sentence structure.
      - Avoid slang, emojis, abbreviations, or casual internet expressions.
      - Do NOT repeat the same sentence or idea in different words.
      - The email must stay concise, focused, and non-redundant.
      - Do NOT over-apologize, over-thank, or exaggerate sentiments.
      - Maintain the selected tone consistently throughout the email. 
      - Do NOT switch between tones.
      - Do NOT use generic filler openings such as "I hope you're doing well" unless the tone naturally requires it.
      - Avoid long, dense paragraphs.
      - Avoid unnecessary parentheses. Use straightforward sentences instead.
      - Ensure the purpose of the email is clear in the opening lines.
      - Do NOT bury the main message in the middle.

      Length Rules (IMPORTANT):
      - Short = A concise but complete email (4–6 sentences). Not cut-off. Must include greeting, full message, closing line, and signature.
      - Medium = A detailed, polished email (8–12 sentences) Not cut-off. Must include greeting, full message, closing line, and signature.
      - Long = A thorough email with expanded context (12+ sentences) Not cut-off. Must include greeting, full message, closing line, and signature.

      Signature Rules:
      - ALWAYS use a complete professional closing, selected based on the chosen tone:
      - For friendly tone → "Warm regards,"
      - For formal tone → "Sincerely,"
      - For professional tone → "Best Regards,"
      - For casual tone → "Thanks,"
      - For any other tone → "Regards,"
      - NEVER end with incomplete closings like "Best," or "Thanks," alone.
      - After the closing, ALWAYS include the sender's name in the new line as:
        "Your Name"
    `
  )
};

// function to generate email reply prompt
export const replyPrompt = (data) => {
  return (
    `
    Generate a ${data?.tone}, well-structured reply email using the following inputs:
    Original Email:
    """
    ${data?.originalEmail}
    """

    Tone: ${data?.tone}
    Desired Length: ${data?.length}

    Key Points / Comments to Include:
    ${data?.comments || "No explicit comments provided. Infer a logical, professional response."}

    STRICT RULES (follow all):
    - This is a REPLY email. Acknowledge and respond to the original email naturally.
    - Do NOT repeat the entire original email. Only reference the relevant points.
    - Do NOT use placeholders like [your name], [sender name], or any bracketed text.
    - Do NOT include hypothetical statements such as “you can mention…” or “for example…”.
    - Do NOT include anything that requires the user to fill in later.
    - Write as if you already know all missing details.
    - Produce a final, polished reply ready to send immediately.
    - Use complete, natural, human-sounding sentences.
    - Maintain the selected tone consistently throughout the reply.
    - Avoid redundancy and avoid repeating the same idea in different words.
    - Use clear, correct, professional English with proper grammar, punctuation, and sentence structure.
    - Avoid generic filler such as “I hope you are doing well” unless required by tone.
    - Ensure the main message is stated clearly in the early lines.
    - Avoid slang, emojis, abbreviations, or casual internet expressions.
    - Avoid unnecessary parentheses. Use straightforward sentences instead.
    - No long or complex paragraphs; keep structure clean and readable.
    - Reply must be aligned with the context of the original email.

    Length Rules (IMPORTANT):
    - Short = A concise but complete email (4–6 sentences). Not cut-off. Must include greeting, full message, closing line, and signature.
    - Medium = A detailed, polished email reply (8–12 sentences) Not cut-off. Must include greeting, full message, closing line, and signature.
    - Long = A thorough email reply with expanded context (12+ sentences) Not cut-off. Must include greeting, full message, closing line, and signature.

    Signature Rules:
    - ALWAYS use a complete professional closing, selected based on the chosen tone:
    - For friendly tone → "Warm regards,"
    - For formal tone → "Sincerely,"
    - For professional tone → "Best Regards,"
    - For casual tone → "Thanks,"
    - For any other tone → "Regards,"
    - NEVER end with incomplete closings like "Best," or "Thanks," alone.
    - After the closing, ALWAYS include the sender's name in the new line as:
        "Your Name"
    `
  );
};
