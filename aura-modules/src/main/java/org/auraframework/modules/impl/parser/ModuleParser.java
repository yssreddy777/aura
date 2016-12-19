/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.auraframework.modules.impl.parser;

import org.auraframework.annotations.Annotations.ServiceComponent;
import org.auraframework.def.DefDescriptor;
import org.auraframework.def.DefDescriptor.DefType;
import org.auraframework.def.module.ModuleDef;
import org.auraframework.system.Parser;
import org.auraframework.system.Source;
import org.auraframework.throwable.quickfix.QuickFixException;

/**
 * Provides ModuleDef implementation
 */
@ServiceComponent
public class ModuleParser implements Parser<ModuleDef> {
    @Override
    public Format getFormat() {
        return Format.XML;
    }

    @Override
    public DefType getDefType() {
        return DefType.MODULE;
    }

    @Override
    public ModuleDef parse(DefDescriptor<ModuleDef> descriptor, Source<ModuleDef> source) throws QuickFixException {
        return null;
    }
}