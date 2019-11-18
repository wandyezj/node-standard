export enum TagType {
    /**
     * start-tag, such as <section>
     * may have attributes
     */
    Start,
    /**
     * end-tag, such as </section>
     * may __not__ have attributes
     */
    End,
    /**
     * empty-element tag, such as <line-break />
     * may have attributes
     */
    Empty
}